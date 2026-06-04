import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace backgrounds
  content = content.replace(/bg-white\s+dark:bg-zinc-900\s+border\s+border-zinc-200\s+dark:border-zinc-800/g, 'bg-card');
  content = content.replace(/bg-white\s+dark:bg-\[#0a0a0a\]\s+border\s+border-slate-100\s+dark:border-slate-800/g, 'bg-card');
  content = content.replace(/bg-white\s+dark:bg-\[#0a0a0a\]\s+border\s+border-slate-200\s+dark:border-slate-800/g, 'bg-card');
  content = content.replace(/bg-white\/30\s+dark:bg-black\/40/g, 'bg-card');
  content = content.replace(/bg-white\/50\s+dark:bg-black\/50/g, 'bg-card');
  content = content.replace(/border\s+border-slate-100\s+dark:border-slate-800\s+rounded-2xl\s+p-6\s+bg-white\s+dark:bg-\[#0a0a0a\]/g, 'rounded-2xl p-6 bg-card');
  content = content.replace(/bg-white\s+dark:bg-zinc-900/g, 'bg-card');
  content = content.replace(/bg-white\s+dark:bg-\[#0a0a0a\]/g, 'bg-card');
  
  // also replace any explicit backdrop-blur-[X] combined with these, or let bg-card take precedence via !important.

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
