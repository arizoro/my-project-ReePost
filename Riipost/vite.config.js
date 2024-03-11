import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  dotenv from 'dotenv'
import{ resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api' : {
        target : 'http://localhost:3000',
        changeOrigin : true,
        secure : false,
      }
    }
  },
  define : {
    'process.env.VITE_API_URL' : JSON.stringify(process.env.VITE_API_URL)
  },
  plugins: [react(),],
})
