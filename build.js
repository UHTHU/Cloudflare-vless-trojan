#!/usr/bin/env node

/**
 * Build script: generates _worker.js from _worker明.js
 * 
 * Usage:
 *   node build.js                    # obfuscated output (default)
 *   node build.js --minify           # minified only (no obfuscation)
 *   node build.js --uuid <uuid>      # override UUID
 *   node build.js --proxyip <ip>     # override proxyIP
 */

const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'Vless_workers_pages', '_worker明.js');
const outFile = path.join(__dirname, 'Vless_workers_pages', '_worker.js');

// Parse CLI args
const args = process.argv.slice(2);
const minifyOnly = args.includes('--minify');
const uuidIdx = args.indexOf('--uuid');
const proxyipIdx = args.indexOf('--proxyip');

let source = fs.readFileSync(srcFile, 'utf-8');

// Strip ES module import - Cloudflare Workers provides connect as a global
source = source.replace(/^import\s*\{[^}]*\}\s*from\s*["']cloudflare:sockets["'];?\s*\n/m, '');

// Strip ts-ignore comment
source = source.replace(/^\/\/ @ts-ignore\s*\n/m, '');

// Strip GAMFC comment
source = source.replace(/^\/\/ <!--GAMFC-->.*?<!--GAMFC-END-->\s*\n/m, '');

// Apply overrides if provided
if (uuidIdx !== -1 && args[uuidIdx + 1]) {
    source = source.replace(
        /let\s+userID\s*=\s*"[^"]*"/,
        `let userID = "${args[uuidIdx + 1]}"`
    );
}
if (proxyipIdx !== -1 && args[proxyipIdx + 1]) {
    source = source.replace(
        /const\s+proxyIPs\s*=\s*\["[^"]*"\]/,
        `const proxyIPs = ["${args[proxyipIdx + 1]}"]`
    );
}

if (minifyOnly) {
    const esbuild = require('esbuild');
    const result = esbuild.transformSync(source, {
        minify: true,
        target: 'es2020',
        format: 'esm',
    });
    fs.writeFileSync(outFile, result.code, 'utf-8');
    console.log(`Minified -> ${outFile} (${(result.code.length / 1024).toFixed(1)} KB)`);
} else {
    const JavaScriptObfuscator = require('javascript-obfuscator');
    const result = JavaScriptObfuscator.obfuscate(source, {
        compact: true,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
    });

    const obfuscatedCode = result.getObfuscatedCode();
    fs.writeFileSync(outFile, obfuscatedCode, 'utf-8');
    console.log(`Obfuscated -> ${outFile} (${(obfuscatedCode.length / 1024).toFixed(1)} KB)`);
}
