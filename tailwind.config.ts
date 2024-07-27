import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      roseWhite: '#F7F1F1',
      tan: '#A57651',
      burntOrange: '#BC5E2B',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-general-sans)", ...fontFamily.sans],
        serif: ["var(--font-paquito)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
} satisfies Config;
