import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';

mkdirSync('public', { recursive: true });
const svg = readFileSync('public/icon.svg');

await sharp(svg).resize(192, 192).png().toFile('public/pwa-192x192.png');
await sharp(svg).resize(512, 512).png().toFile('public/pwa-512x512.png');
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svg).resize(512, 512).png().toFile('public/maskable-512x512.png');

console.log('Icons generated!');
