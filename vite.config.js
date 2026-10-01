import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Caminho do site no GitHub Pages: https://<usuario>.github.io/<repositorio>/
  // Se o repositório tiver outro nome, altere aqui (mantenha as barras).
  base: '/www/',
  build: {
    rolldownOptions: {
      // Duas páginas: o site (index.html) e o Estatuto (estatuto.html), que é independente
      // e não tem link no site. Endereço: https://confrariainsulana.github.io/www/estatuto.html
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        estatuto: fileURLToPath(new URL('./estatuto.html', import.meta.url)),
      },
    },
  },
})
