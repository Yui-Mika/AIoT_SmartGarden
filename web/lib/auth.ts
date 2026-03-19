import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/User";
import { dbConnect } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
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
    async jwt({ token }) {
      if (!token.email) {
        return token;
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
        session.user.role = token.role || "customer";
        session.user.status = token.status || "active";
      }
      return session;
    },
    async redirect({ baseUrl, url }) {
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
