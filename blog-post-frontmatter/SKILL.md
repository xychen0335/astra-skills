---
name: blog-post-frontmatter
description: Create the fixed-format front matter header for new Markdown posts in the XYCHEN personal blog (static Markdown site, posts live in /Users/xychen/Desktop/blog/posts). Use whenever the user asks to write, add, create, or scaffold a blog post, or asks for its YAML header. Every generated header must include title, date, tags, category, published, hideInList, feature, and isTop fields, matching the existing posts/*.md format.
---

# Blog Post Frontmatter

为 XYCHEN 博客（`/Users/xychen/Desktop/blog`）的新文章生成固定格式的 front matter 头。文章是放在 `posts/` 目录下的 Markdown 文件，构建脚本解析文件开头的 front matter 决定标题、日期、分类、发布状态等。

## 新建文章（推荐）

运行 skill 自带的脚本，保证格式完全一致。不要从当前博客仓库查找 `scripts/new-post.mjs`：

```bash
node /Users/xychen/.agents/skills/blog-post-frontmatter/scripts/new-post.mjs <slug> \
  --title "文章标题" --date "2026-08-15 12:00:00" \
  --category 科研 --tags 扩散模型,笔记
```

- `<slug>`：文件名，拼音短横线命名（如 `aigc-kuo-san-mo-xing-zong-jie`）
- `--title`：文章标题，缺省用 slug
- `--date`：文章日期，格式为 `YYYY-MM-DD HH:mm:ss`；省略时使用当前 Asia/Shanghai 时间
- `--category`：必须为 `工作` / `科研` / `学习` / `生活` 之一，缺省 `生活`
- `--tags`：逗号分隔，可省略
- 默认写到 `/Users/xychen/Desktop/blog/posts/`，可用 `--dir <路径>` 覆盖
- 每篇新文章都会把 `date` 写入 front matter；日期是文章元数据的一部分，不要依赖文件修改时间

## 固定格式

```yaml
---
title: '文章标题'
date: 2026-08-15 12:00:00
tags: [科研]
category: 科研
published: true
hideInList: false
feature: 
isTop: false
---
```

字段规则：

- `title`：单引号包裹，内有单引号时写成 `''`
- `date`：必填，使用 `YYYY-MM-DD HH:mm:ss`，与现有 `posts/*.md` 保持一致
- `tags`：方括号 + 逗号分隔，没有就写 `[]`
- `category`：只允许 `工作` / `科研` / `学习` / `生活`，首页按此分组
- `published`：`false` 时不生成页面（草稿）
- `hideInList`：`true` 时保留独立页面但不出现在首页列表
- `feature`：留空
- `isTop`：`false`

front matter 结束后空一行再写正文。正文支持标题、列表（有序/无序/嵌套）、代码块、表格、引用、行内代码、链接与图片，以及 KaTeX 数学公式（`$...$` 行内、`$$...$$` 独立成行）。

日期必须写在 front matter 里。脚本默认填入创建时的 Asia/Shanghai 时间；如果要指定发布日期，使用 `--date`，或手动修改 `date` 行。编辑文章不会自动改变发布日期。

## 手动创建

复制 `/Users/xychen/.agents/skills/blog-post-frontmatter/assets/post-template.md`，把标题和 `date` 替换成实际值。`category` 只能填四个固定值之一；改分类只需修改这一行，推送后自动生效。

## 资源

- `/Users/xychen/.agents/skills/blog-post-frontmatter/scripts/new-post.mjs`：新建文章脚本
- `/Users/xychen/.agents/skills/blog-post-frontmatter/assets/post-template.md`：留空的固定格式头模板
