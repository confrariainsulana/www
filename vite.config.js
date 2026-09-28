import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Caminho do site no GitHub Pages: https://<usuario>.github.io/<repositorio>/
  // Se o repositório tiver outro nome, altere aqui (mantenha as barras).
  base: '/www/',
})
