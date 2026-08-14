#!/usr/bin/env bash
# 将本仓库中的 skill 同步到 ~/.agents/skills
#
# 用法:
#   ./scripts/sync-to-agents.sh                # 同步所有 skill
#   ./scripts/sync-to-agents.sh skill-a ...    # 仅同步指定 skill
#   ./scripts/sync-to-agents.sh --dry-run      # 只预览，不实际复制
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${AGENTS_SKILLS_DIR:-$HOME/.agents/skills}"
DRY_RUN=0

# 解析参数
args=()
for arg in "$@"; do
  if [[ "$arg" == "--dry-run" ]]; then
    DRY_RUN=1
  else
    args+=("$arg")
  fi
done

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "错误: 目标目录不存在: $TARGET_DIR"
  echo "提示: 可用环境变量 AGENTS_SKILLS_DIR 指定其他目录"
  exit 1
fi

# 收集要同步的 skill（目录中含 SKILL.md 的顶层目录）
find_skills() {
  local dir="$1"
  for d in "$dir"/*/; do
    [[ -d "$d" ]] || continue
    if [[ -f "$d/SKILL.md" ]]; then
      basename "$d"
    fi
  done
}

if [[ ${#args[@]} -eq 0 ]]; then
  skills=()
  while IFS= read -r s; do
    skills+=("$s")
  done < <(find_skills "$REPO_DIR")
else
  skills=("${args[@]}")
  # 校验用户指定的 skill 存在
  for s in "${skills[@]}"; do
    if [[ ! -f "$REPO_DIR/$s/SKILL.md" ]]; then
      echo "错误: 仓库中不存在 skill '$s'（缺少 $REPO_DIR/$s/SKILL.md）" >&2
      exit 1
    fi
  done
fi

if [[ ${#skills[@]} -eq 0 ]]; then
  echo "仓库中没有找到任何 skill（含 SKILL.md 的顶层目录）"
  exit 0
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "[dry-run] 将同步以下 skill 到 $TARGET_DIR:"
fi

for s in "${skills[@]}"; do
  src="$REPO_DIR/$s"
  dst="$TARGET_DIR/$s"

  if [[ -d "$dst" ]]; then
    if [[ "$DRY_RUN" -eq 1 ]]; then
      echo "  $s  -> 覆盖 $dst"
    else
      rm -rf "$dst"
      cp -R "$src" "$dst"
      echo "已覆盖: $s -> $dst"
    fi
  else
    if [[ "$DRY_RUN" -eq 1 ]]; then
      echo "  $s  -> 新建 $dst"
    else
      cp -R "$src" "$dst"
      echo "已新建: $s -> $dst"
    fi
  fi
done

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "(dry-run 结束，未做任何修改)"
else
  echo "同步完成"
fi
