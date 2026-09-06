#!/usr/bin/env node
// 在 XYCHEN 博客 posts/ 目录新建一篇带固定格式 front matter 的文章。
// 用法: node new-post.mjs <slug> [--title "标题"] [--date "YYYY-MM-DD HH:mm:ss"] [--category 工作|科研|学习|生活] [--tags a,b] [--dir <posts目录>]
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const CATEGORIES = ['工作', '科研', '学习', '生活'];

const args = process.argv.slice(2);
const positional = [];
const options = {};
for (let i = 0; i < args.length; i += 1) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      options[key] = args[i + 1];
      i += 1;
    } else {
      options[key] = '';
    }
  } else {
    positional.push(args[i]);
  }
}
const option = (name) => options[name.slice(2)];
const slugArg = positional[0];

const usage = '用法: node new-post.mjs <slug> [--title "标题"] [--date "YYYY-MM-DD HH:mm:ss"] [--category 工作|科研|学习|生活] [--tags a,b] [--dir <posts目录>]';

if (!slugArg) {
  console.error(usage);
  process.exit(1);
}

const slug = slugArg.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
if (!slug) {
  console.error('slug 无效');
  process.exit(1);
}
const title = option('--title') || slug;
const rawDate = option('--date');
const parts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
}).formatToParts(new Date()).reduce((result, part) => ({ ...result, [part.type]: part.value }), {});
const defaultDate = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
const date = rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? `${rawDate} 00:00:00` : (rawDate || defaultDate);
if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
  console.error('date 必须是 YYYY-MM-DD HH:mm:ss，或 YYYY-MM-DD');
  process.exit(1);
}
const category = option('--category') || '生活';
if (!CATEGORIES.includes(category)) {
  console.error(`category 必须是 ${CATEGORIES.join(' / ')} 之一`);
  process.exit(1);
}
const tags = (option('--tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean);
const postsDir = option('--dir') || path.join(os.homedir(), 'Desktop', 'blog', 'posts');

const safeTitle = title.replace(/'/g, "''");

const frontmatter = `---
title: '${safeTitle}'
date: ${date}
tags: [${tags.join(',')}]
category: ${category}
published: true
hideInList: false
feature: 
isTop: false
---
`;

const filePath = path.join(postsDir, `${slug}.md`);
await mkdir(postsDir, { recursive: true });
await writeFile(filePath, frontmatter, 'utf8');
console.log(`已创建: ${filePath}`);
