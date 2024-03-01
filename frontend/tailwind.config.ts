import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-brown': '#e76f51',
        'custom-orange': '#f4a261',
        'custom-yellow': '#e9c46a',
        'custom-aqua': '#2a9d8f',
        'custom-darkgreen': '#264653',
      },
    },
  },
  plugins: [],
};
export default config;
