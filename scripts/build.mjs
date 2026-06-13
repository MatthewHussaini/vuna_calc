import { rmSync, mkdirSync, cpSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });

// Root: homepage
mkdirSync('dist', { recursive: true });

// /calc/ subfolder: the calculator
mkdirSync('dist/calc', { recursive: true });
mkdirSync('dist/calc/src', { recursive: true });

// Homepage at root
cpSync('home.html', 'dist/index.html');

// Calculator in /calc/
cpSync('index.html',        'dist/calc/index.html');
cpSync('src/calculator.js', 'dist/calc/src/calculator.js');
cpSync('src/style.css',     'dist/calc/src/style.css');
cpSync('src/ui.js',         'dist/calc/src/ui.js');

console.log('Build complete -> dist/');
console.log('  dist/index.html         (homepage)');
console.log('  dist/calc/index.html    (VUNA-Calc)');
