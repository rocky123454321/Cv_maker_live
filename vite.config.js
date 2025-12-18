import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Cv_maker_live/', // Must match your repo name EXACTLY (case-sensitive)
  plugins: [react()],

})
