import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  
  ],
  server: {
    allowedHosts: [
      "controlledly-larcher-olene.ngrok-free.dev"
    ],
    host: true,
    port: 5173
  }
})
