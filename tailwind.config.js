/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        myclassroom: {
          "primary": "#6526C8",    // Your purple (use your hex)
          "secondary": "#ffffff",  // White, or add other accents as needed
          "accent": "#6526C8",     // Accent can also be your purple
          "neutral": "#3D4451",
          "base-100": "#ffffff",   // Background/main area as white
          // Add more custom colors if needed
        }
      },
      "light",
      "dark"
    ],
  },
}
