# Output Templates

## Classification Table

| 类别 | 论文 | 作者/年份 | 问题设置 | 方法/模型 | 核心思想 | 证据 | 局限/可衔接点 |
|---|---|---|---|---|---|---|---|

Use `证据` for section names, abstract/conclusion support, reported metric, dataset, or a short note such as "abstract only".

## Claim Cards

Use this format for each paper:

```markdown
### [Citation] Title
- 分类: method family / problem setting
- 观点: 在《Title》中，Author et al. 提出了 Method，用于解决 Problem；其核心是 Mechanism，并在 Evidence 上展示了 Effect。
- 可用于综述: A polished sentence that can be pasted into the related-work section.
- 证据来源: abstract / introduction / method / experiments / conclusion
- 可信度: confirmed | partial | needs check
- 备注: limitation, missing metadata, or relation to the user's work
```

## Comparison Matrix

| 论文 | 任务/场景 | 输入与假设 | 方法类别 | 关键模块 | 训练/优化目标 | 数据/实验 | 优势 | 不足 |
|---|---|---|---|---|---|---|---|---|

## Chinese Related-Work Paragraph

Structure:

```text
围绕[问题/类别]，已有研究主要从[分类轴]展开。[AuthorYear]提出[方法]，通过[机制]解决[问题]；[AuthorYear]进一步[对比或扩展]。与上述方法不同，[AuthorYear]关注[另一设置]，其优势在于[证据]，但仍依赖/尚未充分考虑[限制]。总体来看，这类方法为[目标问题]提供了[价值]，但在[你的工作切入点]方面仍存在进一步研究空间。
```

## English Related-Work Paragraph

Structure:

```text
Prior work on [problem/category] can be broadly organized around [axis]. [AuthorYear] proposed [method] to address [problem] by [mechanism], showing [evidence]. [AuthorYear] extended this direction by [contrast]. In parallel, [AuthorYear] focused on [different setting]. These studies demonstrate [shared value], but they leave [gap] less explored, which motivates [user's direction].
```

## Gap Summary

| 已有方向 | 代表论文 | 已解决问题 | 未充分解决的问题 | 可作为本文动机的表述 |
|---|---|---|---|---|
