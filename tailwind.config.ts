import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 4px 16px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
