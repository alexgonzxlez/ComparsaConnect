import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_URL': JSON.stringify(env.API_URL),
      'process.env.API_STORAGE': JSON.stringify(env.API_STORAGE),
      // If you want to exposes all env variables, which is not recommended
      // 'process.env': env
    },
    plugins: [react()]
  };
});