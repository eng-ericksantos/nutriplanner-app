import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione esta seção 'resolve' para configurar os apelidos de caminho
  resolve: {
    alias: {
      // Mapeia o apelido '@' para o diretório './src'
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
})
