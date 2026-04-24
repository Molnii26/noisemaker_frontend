import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
       
      },
    }),
     tailwindcss()
  ],
  server: {
    proxy: {
      '/users': {
        target: 'https://nodejs304.dszcbaross.edu.hu',
        changeOrigin: true
      },

      '/orders': {
        target: 'https://nodejs304.dszcbaross.edu.hu',
        changeOrigin: true
      },

      '/categories': {
        target: 'https://nodejs304.dszcbaross.edu.hu',
        changeOrigin: true
      },

      '/products': {
        target: 'https://nodejs304.dszcbaross.edu.hu',  
        changeOrigin: true
      },

      '/cart': {
        target: 'https://nodejs304.dszcbaross.edu.hu',
        changeOrigin: true
      }

    }
  }
})
