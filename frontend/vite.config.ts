import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // On utilise le polling pour que le hot reload fonctionne avec docker
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: "http://directus:8055/",
        changeOrigin: true,
        secure: false,      
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/directusfiles':{
        target: "http://directus:8055/",
        rewrite: (path) => path.replace(/^\/directusfiles/, '')
      }
    },
  }
})
