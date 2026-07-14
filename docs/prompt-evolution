# Prompt Evolution

This document describes how the workflow evolved over three iterations.

The biggest lesson was that improvements came less from writing increasingly sophisticated prompts and more from designing better governance, clearer rules, and measurable evaluation criteria.

---

# Design Philosophy

Each version was treated as a product iteration rather than simply a prompt revision.

Every change was driven by one question:

> **What behaviour failed, and how can the workflow be redesigned so that failure becomes impossible or significantly less likely?**

---

# Version 1

## Goal

Determine whether a browser-based AI assistant could automate repetitive parts of the application process.

## Design

The initial workflow consisted of:

- a single master prompt
- basic job search criteria
- CV tailoring
- cover letter generation
- manual submission

All instructions were written as one flat list.

---

## What Worked

- Significant reduction in repetitive writing
- Faster application preparation
- Consistent document structure

---

## What Didn't

Several issues emerged during longer sessions.

### Inconsistent Rule Following

The agent occasionally prioritised recently observed browser content over earlier instructions.

---

### Variable Tailoring Quality

The generated materials were technically correct but not consistently prioritised around the strongest experience.

---

### Prompt Maintenance

Adding new requirements made the prompt increasingly difficult to reason about.

New rules occasionally conflicted with existing ones.

---

## Key Lesson

The problem was not model capability.

The problem was governance.

---

# Version 2

## Goal

Improve consistency.

Rather than making the prompt longer, redesign how decisions were prioritised.

---

## Major Changes

### Rule Hierarchy

Introduced three explicit rule tiers.

1. Safety
2. Quality
3. Task

Higher-priority rules always override lower-priority rules.

---

### Session Limits

Introduced a maximum of ten applications per session.

This reduced review fatigue and maintained application quality.

---

### Structured Workflow

Separated:

- role evaluation
- tailoring
- approval
- submission
- tracking

into explicit workflow stages.

---

## Results

Behaviour became significantly more predictable.

However, one major risk remained.

The workflow still treated browser content as ordinary context.

---

# Version 3

## Goal

Improve operational safety.

---

## Major Changes

### Prompt Injection Defence

Browser content became untrusted input.

Instructions embedded inside job descriptions were ignored.

---

### Mandatory Human Approval

Every application now pauses before submission.

No exceptions.

---

### Pre-flight Checklist

Every session begins with validation.

Examples include:

- approved source materials
- tracker availability
- search criteria
- active rule hierarchy

---

### Evaluation Framework

Quality became measurable.

Instead of asking

> "Does this look better?"

the workflow now evaluates:

- formatting
- accuracy
- tailoring
- governance
- approval compliance

---

## Results

Version 3 introduced predictable behaviour through explicit governance rather than increasingly complex prompting.

The workflow became easier to maintain, easier to evaluate, and safer to operate.

---

# Evolution Summary

| Area | Version 1 | Version 2 | Version 3 |
|-------|-----------|-----------|-----------|
| Rule Structure | Flat instructions | Rule hierarchy | Rule hierarchy + governance |
| Safety | Minimal | Approval improvements | Prompt injection defence |
| Quality | Manual judgement | Structured tailoring | Measurable evaluation |
| Workflow | Flexible | Structured | Governed |
| Tracking | Basic | Improved | Fully integrated |
| Evaluation | Subjective | Partial | Framework-driven |

---

# Key Product Learnings

Several broader product lessons emerged.

## Governance Matters More Than Prompt Length

Adding more instructions produced diminishing returns.

Clear prioritisation produced larger improvements.

---

## Human Oversight Builds Trust

The highest-risk failures occurred when irreversible actions could be taken without review.

Mandatory approval eliminated that class of failure.

---

## Evaluation Drives Better Products

Writing explicit quality criteria before making changes made it easier to identify whether each iteration represented genuine improvement.

---

## Simplicity Improves Maintainability

The workflow became easier to extend after introducing:

- rule hierarchy
- deterministic workflows
- explicit approval checkpoints

rather than continually expanding prompt complexity.

---

# Future Evolution

Potential future iterations include:

- confidence scoring for role fit
- recruiter response analytics
- follow-up drafting
- application quality dashboards
- multi-platform support
- automated regression testing
- prompt version benchmarking

---

# Final Reflection

The most important insight from this project is that designing reliable AI products is not primarily a prompt engineering exercise.

The largest improvements came from applying product management principles:

- defining measurable outcomes
- designing explicit governance
- prioritising trust over autonomy
- iterating based on evidence
- refining workflows through structured evaluation

These principles shaped the workflow far more than any individual prompt revision.
