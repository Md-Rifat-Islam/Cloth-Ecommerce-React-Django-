import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import path from 'path'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react(), commonjs],
  resolve: {
    alias: {
      // 'react': 'preact/compat',
      // 'react-dom': 'preact/compat',
      // '@': path.resolve(__dirname, 'src'),
    }
  }
})


// vite.config.js
// export default {
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:8000',
//         changeOrigin: true,
//       },
//     },
//   },
// };

