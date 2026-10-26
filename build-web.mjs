import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { build } from 'esbuild';

mkdirSync('www', { recursive: true });
await build({ entryPoints: ['src/nativo.js'], bundle: true, minify: true, format: 'iife', outfile: 'www/nativo.js' });
let html = readFileSync('web/index.html', 'utf8');
if (!html.includes('</head>')) throw new Error('web/index.html no tiene </head>');
html = html.replace('</head>', '<script src="nativo.js"></script>\n</head>');
writeFileSync('www/index.html', html);
for (const f of ['icon-192.png', 'icon-512.png', 'manifest.webmanifest']) copyFileSync('web/' + f, 'www/' + f);
console.log('web lista en www/');
