# Prompt Evolution

This document describes how the workflow evolved over four iterations.

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

# Version 4

## Goal

Improve throughput and decision quality without weakening the governance introduced in Version 3.

Version 3 was safe but slow. Evaluating one role at a time made it hard to compare opportunities, and document generation still required manual prompting.

---

## Major Changes

### Batch Evaluation

Roles are now evaluated five at a time.

Each batch is presented as a single comparison table so roles can be ranked against each other rather than judged in isolation.

---

### Match Score Rubric

Replaced the subjective fit score with a weighted 0 to 100 rubric:

- Role fit (30)
- Domain fit (25)
- Requirements coverage (25)
- Practical fit (20)

Score bands determine the recommendation: 80 and above apply, 60 to 79 apply with a targeted cover letter, below 60 skip.

---

### Automatic Document Generation

Tailored CVs and cover letters are now produced automatically as Word documents with matching PDFs at the tailoring stage.

File naming follows a fixed convention so the output folder stays organised across sessions.

---

### Candidate Facts Layer

The prompt now carries a dedicated section of verified personal facts, including NIE work authorisation for Spain, location, salary expectations, and rules for handling protected-characteristic questions.

This removed a recurring failure where the agent left work authorisation questions blank or answered them inconsistently.

---

### LinkedIn-Specific Handling

Added explicit rules for the realities of applying on LinkedIn:

- Easy Apply screening questions read back at the approval stage
- external ATS redirects handled with the same injection caution
- duplicate detection against the tracker before evaluation
- repost dates and applicant counts captured as prioritisation signals
- recruiter and hiring manager details logged for manual follow-up

---

## Results

Version 4 shifted the workflow from processing applications to comparing opportunities.

Batch scoring surfaced better roles faster, automatic file generation removed a manual step from every application, and the candidate facts layer eliminated a category of inconsistent form answers.

Governance from Version 3 remained fully intact. Throughput improved without giving up the approval gate or the session cap.

---

# Version 5

## Goal

Fix a specific scoring failure that batch evaluation had made easier to miss: the requirements coverage score sometimes reflected what the evaluator assumed a role needed rather than what the posting actually asked for. A handful of roles worth applying to were scored below the apply threshold and nearly skipped.

---

## Major Changes

### Explicit Requirements Extraction

Before scoring requirements coverage, the workflow now extracts only the requirements stated literally in the posting: named skills, years of experience, certifications, domain background. Anything the model would otherwise infer from a job title or industry convention is excluded from this list.

---

### Assumption Ledger

Any requirement the evaluator is tempted to infer beyond the literal posting text is now logged separately as an assumption, tagged with a risk level, and shown alongside the score rather than folded into it.

---

### Two-Pass Requirements Coverage Scoring

Requirements coverage (25 points) is scored only against the explicit list. The assumption ledger is visible at review time, so a human can see which inferences, if any, would have changed the outcome, instead of the gap surfacing only after a manual re-evaluation.

---

## Results

Version 5 did not change the rubric's weighting or the approval gate. It changed what the requirements coverage score was allowed to be built from. Roles that previously scored below threshold on an assumed requirement now score on what the posting actually said, with the assumption visible rather than silently subtracted.

---

# Evolution Summary

| Area | Version 1 | Version 2 | Version 3 | Version 4 | Version 5 |
|-------|-----------|-----------|-----------|-----------|-----------|
| Rule Structure | Flat instructions | Rule hierarchy | Rule hierarchy + governance | Governance + candidate facts layer | Unchanged |
| Safety | Minimal | Approval improvements | Prompt injection defence | Defence extended to external ATS sites | Unchanged |
| Quality | Manual judgement | Structured tailoring | Measurable evaluation | Weighted match score rubric | Rubric scored only against explicit requirements |
| Workflow | Flexible | Structured | Governed | Governed + batch evaluation | Unchanged |
| Tracking | Basic | Improved | Fully integrated | Enriched with prioritisation signals | Unchanged |
| Evaluation | Subjective | Partial | Framework-driven | Comparative, five roles at a time | Assumption ledger surfaced at review |
| Documents | Manual generation | Manual generation | Manual generation | Automatic Word + PDF output | Unchanged |

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

## Comparison Beats Isolation

Scoring one role at a time answered "is this role acceptable?"

Scoring five at a time answered a better question: "which of these roles deserves my effort?"

---

## An Unscored Assumption Is Still a Decision

A rubric can be fully documented and still hide a judgement call. The requirements coverage score looked objective because it was a number, but the number sometimes rested on an assumption about the role that was never written down anywhere. Making the assumption visible mattered more than adjusting the weighting.

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
- tracking how often assumption ledger entries turn out to reflect a real requirement

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
