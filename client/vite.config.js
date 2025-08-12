import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        // Important: Add UI5 components to content config
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
          "./node_modules/@ui5/webcomponents-react/dist/**/*.js"
        ],
        // Add core UI5 styles as important
        important: true,
      }
    })
  ],
})
