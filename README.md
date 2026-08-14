# astra-skills

个人自用的 agent skills 集合。这里的 skill 均为本人（xychen）根据自身工作流亲手编写，涵盖论文审稿、文献综述、图像风格化、博客写作等场景。

## 目录结构

```
astra-skills/
├── literature-review-synthesis/   # 批量论文阅读与综述写作
├── paper-reviewer/                # 结构化中文审稿意见生成
├── photo-style-router-v1/         # 照片转插画（动漫/线稿/赛博朋克/古风）
├── ds-codex/                      # 委托 codex CLI 处理图像与代码审查
├── scripts/
│   └── sync-to-agents.sh          # 同步脚本（见下方工作流）
└── README.md
```

## Skill 一览

| Skill | 用途 |
|---|---|
| `literature-review-synthesis` | 从 PDF、论文链接、标题/摘要等批量提取论点，生成文献综述 |
| `paper-reviewer` | 为论文/稿件生成结构化中文审稿意见（优点 + 5-6 条不足） |
| `photo-style-router-v1` | 照片转插画，支持动漫风、极简线稿、赛博朋克、中国古风四种风格 |
| `ds-codex` | 将图像理解、扫描件处理等非文本任务及代码审查委托给 codex CLI |

## 工作流：新增 skill 后同步到 ~/.agents/skills

本仓库是 skill 的**源**，`~/.agents/skills` 是 agent 实际加载的**目标目录**。
在仓库中新建或修改 skill 后，需要同步到 `~/.agents/skills` 才能生效。

### 1. 新增 skill

```bash
mkdir my-new-skill
# 编写 my-new-skill/SKILL.md（可含 agents/、references/、scripts/ 等子目录）
```

SKILL.md 格式要求：YAML front matter 中必须包含 `name` 和 `description` 字段。

### 2. 同步

```bash
# 一次性：把所有 skill 同步（cp 覆盖）到 ~/.agents/skills
./scripts/sync-to-agents.sh

# 或仅同步指定 skill
./scripts/sync-to-agents.sh my-new-skill

# 预览将执行的操作，不实际写入
./scripts/sync-to-agents.sh --dry-run
```

### 3. 生效

- 目标目录 `~/.agents/skills/<skill-name>` 与仓库保持一致（含子目录与文件权限）
- 已存在的同名 skill 会被**整体覆盖**，请确认没有未备份的本地改动
- 该 skill 会在 agent 的下一次会话中生效

> 注意：同步方向是仓库 → `~/.agents/skills`。如果你在 `~/.agents/skills` 中直接修改过某个 skill，请先把改动拷回仓库，避免被覆盖丢失。
