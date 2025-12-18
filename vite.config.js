import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Cv_maker_live/', // <-- MUST match repo name
  plugins: [react()],
})
