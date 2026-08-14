---
name: literature-review-synthesis
description: Classify and synthesize batches of academic papers from PDFs, paper links, titles, abstracts, or citation lists into literature-review-ready claims. Use when Codex needs to read papers, organize related work, extract statements like "In paper X, author Y proposed method Z for problem P", compare methods across categories, build survey tables, draft Chinese or English related-work paragraphs, or prepare a literature-review section with citations and evidence.
---

# Literature Review Synthesis

## Purpose

Turn a batch of papers into defensible literature-review material: categorized evidence, concise contribution claims, cross-paper comparisons, and polished related-work paragraphs. Favor precise, source-grounded statements over broad summaries.

## Inputs

Accept any mix of:

- Local PDFs or folders of PDFs.
- Paper links, DOI/arXiv/IEEE/ACM/Springer pages, titles, abstracts, or BibTeX.
- A target topic, thesis section, or classification scheme from the user.
- The user's draft paragraph, when the task is to revise or extend related work.

If the user gives links or asks for current metadata, verify with web lookup. If only PDFs are local, extract locally first. For scanned PDFs, use OCR only when needed.

## Workflow

1. **Scope the review.** Identify the target research problem, intended section, language, and required granularity. If missing, infer a practical taxonomy from the batch and state the assumption.
2. **Extract paper records.** For each paper, capture title, authors, year, venue if available, problem, method family, key idea, task/data, results, and limitations. Use the paper itself as the primary source.
3. **Classify papers.** Group by the dimension most useful to the user's section: problem setting, method family, model architecture, data modality, supervision regime, channel/model assumptions, or evaluation protocol.
4. **Generate claim cards.** Produce atomic claims in the form: "In/For [paper], [author(s)] proposed/introduced/designed [method] to address [problem], by [core mechanism], achieving/showing [evidence if available]."
5. **Synthesize across papers.** Combine compatible claim cards into a narrative that explains a progression, contrast, or gap. Do not merely list papers chronologically unless the user requests chronology.
6. **Mark evidence quality.** Label claims as `confirmed`, `partial`, or `needs check` depending on whether the PDF/link directly supports all fields.
7. **Draft literature text.** When asked, write a cohesive Chinese or English paragraph with citations. Preserve the user's citation style when visible.

## Output Modes

Choose the smallest useful output unless the user asks for all:

- **Classification table:** Use for many papers or first-pass organization.
- **Claim cards:** Use for literature survey material and note-taking.
- **Comparison matrix:** Use when methods need to be contrasted.
- **Related-work paragraph:** Use when the user asks for text that can enter a paper.
- **Gap summary:** Use when the user asks what remains unsolved or how to motivate their work.

For exact templates, read `references/output_templates.md`.

## Classification Guidance

Use domain-aware categories when possible. For signal processing, wireless, ISAC, channel estimation, diffusion models, computer vision, and multimodal learning, read `references/classification_axes.md` before creating the taxonomy.

## Claim Discipline

- Keep each claim atomic: one paper, one method, one problem, one evidence note.
- Use "proposed", "introduced", "designed", "formulated", or "extended" only when supported by the source.
- Distinguish the paper's actual contribution from your synthesis. Prefix synthesis with phrases such as "Taken together" or "This line of work suggests".
- Do not invent author names, venues, metrics, datasets, baselines, or numerical gains.
- If only an abstract is available, say so and avoid detailed claims about experiments or implementation.
- If authorship is long, use first author + "et al." unless the user requests full names.
- Keep citation placeholders stable, e.g. `[AuthorYear]`, when no BibTeX key is provided.

## Literature Paragraph Style

Prefer this structure:

1. Topic sentence naming the category or line of work.
2. Two to five source-grounded claim sentences.
3. A contrast sentence explaining differences among methods.
4. A gap sentence that motivates the user's work without overstating prior limitations.

In Chinese, use academic but direct prose. Avoid empty phrases like "近年来受到广泛关注" unless followed by a concrete reason.

## Quality Checks

Before finalizing, verify:

- Every paper mentioned in the paragraph appears in the table or claim cards.
- Every method-problem statement is traceable to a source section, abstract, or conclusion.
- Categories are mutually understandable and useful for the user's review goal.
- Limitations are written as evidence-based gaps, not dismissive criticism.
- Uncertain metadata is explicitly marked.

## References

- `references/output_templates.md`: tables, claim-card schema, paragraph formats.
- `references/classification_axes.md`: useful taxonomy axes for the user's common research areas.
