import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/(main)/**/*.{js,ts,jsx,tsx,mdx}", // Đã trỏ đúng vào thư mục (main)
  ],
  theme: {
    extend: {
      colors: {
        // Khai báo lại toàn bộ hệ màu bị mất của ông
        primary: "var(--primary, #006d37)",
        "on-primary": "var(--on-primary, #ffffff)",
        "primary-container": "var(--primary-container, #9df7b2)",
        "on-primary-container": "var(--on-primary-container, #00210c)",
        secondary: "var(--secondary, #4d6353)",
        "on-secondary": "var(--on-secondary, #ffffff)",
        tertiary: "var(--tertiary, #b91c1c)", // Màu đỏ cảnh báo
        "on-tertiary": "var(--on-tertiary, #ffffff)",
        "tertiary-fixed": "var(--tertiary-fixed, #ffdad6)",
        "on-tertiary-fixed-variant": "var(--on-tertiary-fixed-variant, #410002)",
        error: "var(--error, #ba1a1a)",
        "on-error": "var(--on-error, #ffffff)",
        surface: "var(--surface, #f7f9fc)",
        "on-surface": "var(--on-surface, #191c1e)",
        "on-surface-variant": "var(--on-surface-variant, #3d4a3e)",
        outline: "var(--outline, #72796f)",
        "outline-variant": "var(--outline-variant, #c1c9be)",
        
        // Các dải màu nền (Surface containers)
        "surface-container-lowest": "var(--surface-container-lowest, #ffffff)",
        "surface-container-low": "var(--surface-container-low, #f7f9fc)",
        "surface-container": "var(--surface-container, #f1f4f9)",
        "surface-container-high": "var(--surface-container-high, #e6e8eb)",
        "surface-container-highest": "var(--surface-container-highest, #e0e3e6)",
      }
    },
  },
  plugins: [],
};

export default config;