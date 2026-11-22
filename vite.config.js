import { defineConfig } from 'vite'

// User site repositories (USERNAME.github.io) use '/' as base.
// If you deploy under a project repo, set VITE_BASE to '/repository-name/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
})
