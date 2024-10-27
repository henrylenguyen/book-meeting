import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  publicDir: 'public', // Specify the public directory
  build: {
    outDir: 'dist' // Specify the output directory for the build
    // You can add more build options here if needed
  },
  base: './'
})
