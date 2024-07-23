import type { Config } from "tailwindcss";
import env from "./utils";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: env.PRIMARY,

        secondary: env.SECONDARY ,

        accent: env.ACCENT,

        complement: "#f4f0fa",

        neutral: "#2C2C3B",

        "base-100": "#FFFFFF",

        info: "#263593",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: env.PRIMARY,

          secondary: env.SECONDARY ,
  
          accent: env.ACCENT,
  
          complement: "#f4f0fa",
  
          neutral: "#2C2C3B",  

          "base-100": "#FFFFFF",

          info: "#263593",

          success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
