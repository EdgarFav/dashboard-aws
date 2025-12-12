import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), checker({typescript: true}), tailwindcss()],
   server: {
    host: true, // o '0.0.0.0'
    port: 5173,
    watch: {
      usePolling: true, // Importante para Docker en Windows
    }
  }
})
