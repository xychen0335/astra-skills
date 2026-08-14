# Classification Axes

Use these axes when they fit the user's paper batch. Prefer 2-4 top-level categories; avoid over-fragmenting.

## Wireless / ISAC / Channel Estimation

- Model-based sparse estimation: compressed sensing, sparse Bayesian learning, AMP, OMP, dictionary learning.
- Deep unfolding and learned iterative methods: model-driven networks, learned SBL/AMP, unfolded optimization.
- Data-driven neural estimation: CNN, Transformer, UNet, diffusion/score-based models.
- Generative restoration: diffusion models, Schrödinger bridge, flow matching, denoising priors.
- Scenario assumptions: FDD/TDD, massive MIMO, mmWave/THz, near-field/far-field, cell-free, RIS/IRS-assisted, ISAC sensing channel.
- Evaluation axes: NMSE/BER/rate/sensing accuracy, pilot overhead, SNR robustness, mobility/generalization, complexity.

## Computer Vision / Image Restoration

- Physical-model-based restoration: scattering, polarization, degradation modeling.
- Supervised restoration networks: CNN/UNet/Transformer restoration.
- Generative priors: GAN, diffusion model, flow matching, latent diffusion, ControlNet-style conditioning.
- Multimodal guidance: text prompts, vision-language models, semantic constraints.
- Evaluation axes: PSNR, SSIM, LPIPS, perceptual quality, structure preservation, domain shift.

## Multimodal / Large Models

- Pretraining and architecture: vision encoder, projector, LLM backbone, cross-attention, adapter.
- Instruction tuning and alignment: SFT, preference data, DPO/RLHF, safety alignment.
- Domain adaptation: medical, remote sensing, wireless, industrial inspection.
- Evaluation axes: VQA accuracy, hallucination, grounding, reasoning, domain expert evaluation, data quality.

## General Method Taxonomy

- Problem setting: what task, input/output, assumptions.
- Method family: model-based, learning-based, hybrid/model-driven, generative, retrieval-augmented.
- Supervision: supervised, self-supervised, unsupervised, weakly supervised, preference-aligned.
- Evidence: theoretical analysis, simulation, benchmark experiments, ablation, real-world deployment.
- Limitation: assumptions, data dependence, compute cost, generalization, interpretability, missing baselines.
