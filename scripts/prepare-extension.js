import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const manifestPath = path.resolve(__dirname, '../manifest.json');

async function prepareExtension() {
  try {
    // Copy manifest to dist
    await fs.copy(manifestPath, path.join(distDir, 'manifest.json'));
    
    // Copy icons
    const iconsDir = path.resolve(__dirname, '../public/icons');
    await fs.copy(iconsDir, path.join(distDir, 'icons'));
    
    console.log('Extension files prepared successfully!');
  } catch (err) {
    console.error('Error preparing extension:', err);
    process.exit(1);
  }
}

prepareExtension();