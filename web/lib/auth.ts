import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/User";
import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await dbConnect();

        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.role !== "admin") {
          throw new Error("Only admin accounts can login here");
        }

        if (user.status === "banned") {
          throw new Error("Account is banned");
        }

        if (!user.password) {
          throw new Error("Password not set for this account");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // If it's a credentials login, already validated
      if (account?.provider === "credentials") {
        return true;
      }

      // Google OAuth flow
      if (!user.email || !user.name) {
        return false;
      }

      await dbConnect();

      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "customer",
          status: "active",
          provider: "google",
        });
        return true;
      }

      if (existingUser.status === "banned") {
        return false;
      }

      existingUser.name = user.name;
      existingUser.image = user.image;
      await existingUser.save();
      return true;
    },
    async jwt({ token, account }) {
      if (!token.email) {
        return token;
      }

      // Set provider info from account if available
      if (account?.provider) {
        token.provider = account.provider;
      }

      await dbConnect();
      const dbUser = await UserModel.findOne({ email: token.email });
      if (!dbUser) {
        return token;
      }

      token.id = dbUser._id.toString();
      token.role = dbUser.role;
      token.status = dbUser.status;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || "";
        session.user.role = (token.role as "customer" | "admin") || "customer";
        session.user.status = (token.status as "active" | "banned") || "active";
      }
      return session;
    },
    async redirect({ baseUrl, url }) {
      // Redirect admin to admin dashboard after login
      if (url.includes("/admin") || (url === "/" && typeof url === "string")) {
        return `${baseUrl}/admin`;
      }

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
};
