# Job Application Agent — Interactive Demo

A front-end-only, seeded-data prototype that makes the governance model in [`../prompts/master-prompt.md`](../prompts/master-prompt.md) clickable: batch evaluation, the weighted match score rubric, prompt injection defence, duplicate detection, the mandatory approval gate, the session cap, and the application tracker.

No backend, no real job board or Google Sheets connection — this demonstrates the governance behaviour only.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Suggested walkthrough

1. **Batch View** — five listings at a time, ranked in one comparison table. Two listings carry an embedded prompt injection attempt (flagged, never executed); one is a duplicate of an already-tracked role (skipped before scoring).
2. Click a row to open **Listing Detail** and see the injection attempt quoted inline with a "treated as data, not followed" flag, plus the full rubric breakdown.
3. **Approval Queue** — roles scoring 60+ wait for an explicit human decision. Approve enough of them and the session cap (10) blocks further submissions.
4. **Tracker** — full history, filterable by decision and band, with a CSV export button.

## Stack

React + TypeScript + Tailwind CSS v4, scaffolded with Vite. All data is seeded in `src/data/seed.ts`; nothing is fetched from a network.
