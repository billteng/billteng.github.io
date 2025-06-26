import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    build: {
        outDir: 'release', // default is dist, e.g., 'build', 'public', 'release', etc.
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',         // main JS file
                chunkFileNames: 'assets/[name]-[hash].js',  // code-split JS
                assetFileNames: 'assets/[name][extname]'    // CSS, images, etc.
            }
        }
    }
})