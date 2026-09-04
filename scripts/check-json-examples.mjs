#!/usr/bin/env node
// Fails if any ```json example in the docs source is not parseable JSON.
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const includesDir = 'source/includes';
const jsonFence = /```json\n([\s\S]*?)```/g;
let checked = 0;
let invalid = 0;

for (const filename of readdirSync(includesDir).filter(name => name.endsWith('.md'))) {
   const markdown = readFileSync(join(includesDir, filename), 'utf-8');
   for (const [, block] of markdown.matchAll(jsonFence)) {
      checked += 1;
      try {
         JSON.parse(block);
         }
      catch (error) {
         invalid += 1;
         console.error(`invalid JSON example in ${filename}: ${error.message}`);
         }
      }
   }

console.log(`json examples: ${checked} checked, ${invalid} invalid`);
process.exit(invalid ? 1 : 0);
