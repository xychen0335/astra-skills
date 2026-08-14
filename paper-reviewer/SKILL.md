---
name: paper-reviewer
description: Draft structured Chinese academic peer-review comments for papers, manuscripts, article abstracts, or paper PDFs. Use when the user asks for 论文审稿, 审稿意见, review comments, reviewer comments, peer review, 优点不足, or a concise Chinese review that summarizes a paper and lists 5-6 weaknesses.
---

# Paper Reviewer

## Output Contract

Produce Chinese review comments in exactly three labeled parts:

1. `【论文总结】`
2. `【论文优点】`
3. `【过渡句】`

Keep the tone professional, constructive, and suitable for academic peer review. Do not invent unsupported technical details; infer conservatively from the paper, abstract, title, figures, or user-provided notes. If key information is missing, state the gap briefly and write a review based on the available content.

## Required Structure

### 1. 论文总结

Start with this sentence pattern and fill in the paper-specific content:

`这篇论文面向xxx问题，提出了xxx方法，具有xxx性能，非常有应用意义。`

Then add 1-3 sentences summarizing:

- the research motivation or application scenario;
- the central technical idea, model, system, framework, algorithm, dataset, experiment, or theoretical contribution;
- the main claimed results, if available.

### 2. 论文优点

Write one paragraph that summarizes the strengths of the paper. Prefer 3-5 strengths, woven into prose rather than a numbered list unless the user explicitly asks for bullets.

Common strength angles:

- important or timely problem;
- clear method design or meaningful technical novelty;
- solid experiments, baselines, ablations, or analysis;
- promising performance or practical applicability;
- clear writing, complete system pipeline, or useful dataset/resource contribution.

### 3. 过渡句 and Weaknesses

Begin with a natural transition sentence such as:

`尽管该论文具有上述优点，但仍存在一些需要进一步完善的问题：`

Then list exactly 5-6 weaknesses as numbered items. Each item should be specific, review-like, and actionable. Prefer issues involving:

- novelty or positioning compared with prior work;
- method assumptions, theoretical justification, or design rationale;
- experimental completeness, baseline selection, ablation studies, or statistical significance;
- dataset scale, diversity, bias, or real-world generalization;
- evaluation metrics, qualitative analysis, error analysis, or user/application validation;
- reproducibility, implementation details, hyperparameters, complexity, or resource cost;
- writing clarity, related work coverage, figure/table readability, or limitation discussion.

Use measured language. Avoid hostile phrasing. When evidence is uncertain, use phrases like `建议作者进一步说明`, `目前表述仍不够充分`, or `实验部分可进一步补充`.

## Style Rules

- Write in Chinese unless the user requests another language.
- Keep the review concise but substantive.
- Adapt `xxx问题`, `xxx方法`, and `xxx性能` to the actual paper content.
- Do not include acceptance decisions unless the user asks for them.
- Do not fabricate citations, exact metrics, datasets, or comparisons that are not provided.
