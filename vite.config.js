import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
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
