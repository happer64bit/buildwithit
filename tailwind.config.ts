import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  darkMode: "class",
  
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, grey 1px, transparent 1px),
          linear-gradient(to bottom, grey 1px, transparent 1px)
        `,
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1100px"
        }
      }
    }
  },

  plugins: [typography]
} as Config;
