---
name: ds-codex
description: |
  将两类工作委托给 codex CLI：(1) 非文本模态处理——查看、分析、描述、修改图像/截图/照片，理解扫描版 PDF/文档，或基于图像生成内容时，用 `codex exec -i <image>` 调用 codex 完成；(2) 代码审查——代码编写/修改任务收尾时，询问用户后用 `codex exec review` 让 codex 审查本次改动。每当任务中出现图片、截图、照片、扫描件、非文本 PDF，或本会话刚写完/改完代码，即使没有提到"codex"也应该考虑启用本 skill。
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
metadata:
  trigger: 图像/截图/扫描件等非文本内容处理；代码编写完成后的 codex review
---

# ds-codex：把非文本模态处理和代码审查委托给 codex

本 skill 负责两类职责。核心思想：**codex（默认 gpt-5.6-sol）在图像理解和代码审查上比当前模型更专业、更可靠，用户明确要求这两类工作交给 codex 完成，不要用当前模型自己的视觉能力或"自查"式审查去替代。**

## 职责一：非文本模态处理

当用户任务涉及以下内容时，把理解/处理工作委托给 codex：

- 查看、分析、描述图像、照片、截图、示意图
- 从图像中提取信息（图表数据、界面元素、手写内容等）
- 基于图像做修改或生成（图像编辑、风格转换、照着截图实现前端等）
- 扫描版 PDF / 文档——先转成图片，再交给 codex

### 调用方式

```bash
# 在图片所在目录（或相关项目目录）执行
codex exec --sandbox workspace-write -i path/to/image.png "给 codex 的完整任务描述"
```

要点：

- **工作目录**：先 `cd` 到图片或相关项目所在目录，codex 才能在正确位置读写文件。
- **提示词自包含**：codex 看不到本会话的对话上下文，把任务目标、输入文件路径、期望输出完整写进提示词。
- **多图**：重复使用 `-i` 可一次传递多张图片。
- **扫描版 PDF**：先用 `pdftoppm -png -r 150 file.pdf page` 把每页转成 PNG，再把图片传给 codex；若 PDF 本身含可复制文本，直接读取文本即可，不需要 codex。
- **同步等待并汇报**：codex exec 可能运行较久，用足够长的超时或后台任务方式等待其完成；完成后把关键结论整理给用户，codex 生成/修改的文件保留在工作目录中。
- **失败处理**：退出码非零时，把 stderr 报告给用户并给出修复建议（如权限、网络、登录问题），不要假装成功。

### 不需要调用的情况

- 纯文本任务（代码、纯文本文档、文本分析）
- 图片只是无关附件，任务与图像内容无关
- 仅本地文件操作（移动、重命名图片）

## 职责二：代码编写完成后的 codex review

当本会话完成了一次代码编写/修改（新建文件、改代码、修 bug、重构等）后：

1. **主动询问用户**是否调用 codex 审查本次改动（用 AskUserQuestion，选项如「现在 review」「跳过」）。仅当改动极其微小（如修正一个 typo）时才可直接跳过询问。
2. 用户同意后，在**代码所在的 git 仓库目录**执行：

   ```bash
   # 改动尚未提交（最常见）：
   codex exec --sandbox workspace-write review --uncommitted
   # 改动已合并/提交到分支，对比主分支：
   codex exec --sandbox workspace-write review --base main
   # 审查某个提交引入的改动：
   codex exec --sandbox workspace-write review --commit <sha>
   ```

   若目录不是 git 仓库，改用普通 exec 并在提示词中列出本次涉及的文件：

   ```bash
   codex exec --sandbox workspace-write "审查以下文件的本次改动：<文件列表>。重点看逻辑错误、边界条件、安全问题。"
   ```

3. **汇报并跟进**：把 codex 发现的问题按严重程度完整整理给用户（不要筛选隐瞒），询问用户是否修复关键问题，得到确认后再动手修改。

### 注意

- 未获用户确认前不要自动运行 review。
- review 针对**本次会话产生的改动**，不要对整仓库做无关的全面审查。

## 通用调用规则

- 统一使用非交互模式 `codex exec`，加 `--sandbox workspace-write` 让 codex 能在工作目录内读写文件。
- 不额外指定 `-m`，使用 codex 配置（`~/.codex/config.toml`）中的默认模型；用户明确要求时才覆盖。
- 调用前确认 codex 已安装且已登录（`which codex` 能找到、`~/.codex/auth.json` 存在）；缺失时告知用户，不要假装执行。
