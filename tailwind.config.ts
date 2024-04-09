import type { Config } from "tailwindcss";


const colors :Config ={
  primary:{
    500:"#FF7000",
    100:"#FFF1E6"
  },
  dark:{
    100:"#000000",
    200:"#0F1117",
    300:"#151821",
    400:"#212734",
    500:"#101012"
  },
  light:{
    900:"#FFFFFF",
    800:"#F4F6F8",
    850:"#FDFDFD",
    700:"#DCE3F1",
    500:"#7B8EC8",
    400:"#858EAD"
  },
}
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [],
};
export default config;
