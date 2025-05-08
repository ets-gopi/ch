import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry file for your service
  outDir: 'dist', // Output directory
  format: ['cjs'], // Output format, CommonJS (for Node.js)
  target: 'node22', // Target environment (Node.js 16)
  sourcemap: true, // Generate source maps for debugging
  clean: true, // Clean dist folder before each build
  dts: {
    compilerOptions: {
      composite: false
    }
  } // Generate declaration files (.d.ts) for types
});
