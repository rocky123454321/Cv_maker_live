import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Cv_maker/', // <-- add this line for GitHub Pages
  plugins: [react()],
  server: {
    host: true,       // allow external access
    port: 5173,       // your dev server port
    strictPort: true, // fail if port 5173 is in use
    allowedHosts: "all", // allow any host (ngrok URLs will work)
  },
})
