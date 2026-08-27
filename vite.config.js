import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        // Splits large third-party libraries into their own chunks so the
        // browser can cache them separately and the initial bundle stays
        // smaller — purely a load-performance improvement, no behavior change.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'markdown-vendor': ['react-markdown'],
          'icons-vendor': ['react-icons'],
          // react-icons/fa and react-icons/si are imported with `import * as`
          // (needed since icon names are admin-editable, chosen at runtime)
          // which pulls in the full icon sets. Isolating them into their own
          // chunk keeps them out of the critical-path bundle and lets the
          // browser cache them separately from app code that changes often.
          'icons-full-vendor': ['react-icons/fa', 'react-icons/si'],
        },
      },
    },
  },
})
