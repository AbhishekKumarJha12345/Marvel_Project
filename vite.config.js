import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5171,
        strictPort: true,
        allowedHosts: ['sjci.marvel.pinacalabs.com','https://mhmarvel.org'], // Add your domain here
    },
})