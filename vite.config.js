import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE
    ? `/${process.env.GITHUB_PAGES_BASE.replace(/^\/|\/$/g, '')}/`
    : '/DCB-Atlas/',
  plugins: [react(), tailwindcss()],
})
