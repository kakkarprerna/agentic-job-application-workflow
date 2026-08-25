# Architecture Decision Records (ADRs)

This document captures the key product and technical decisions made during the development of the workflow.

Each Architecture Decision Record (ADR) explains:

- **Context** — the problem being solved
- **Decision** — the chosen approach
- **Alternatives Considered** — other options evaluated
- **Consequences** — benefits and trade-offs
- **Status** — whether the decision is active or superseded

The goal is to document *why* decisions were made, not just *what* was built.

---

# ADR-001 — Human Approval Before Submission

**Status**

✅ Accepted (v1)

## Context

The workflow was capable of submitting applications automatically.

While this maximised efficiency, every submission represented the user's professional identity. An incorrect application could not be recalled once submitted.

## Decision

Require explicit human approval before every application submission.

No exceptions are permitted, regardless of confidence or perceived role fit.

## Alternatives Considered

- Fully autonomous submission
- Review only cover letters
- Random sampling (e.g. review one in every five applications)

## Consequences

### Benefits

- Eliminates unintended submissions
- Maintains user trust
- Prevents inaccurate applications

### Trade-offs

- Lower application throughput
- Additional review time for every submission

---

# ADR-002 — Rule Hierarchy Instead of Flat Instructions

**Status**

✅ Accepted (v2)

## Context

The original workflow used a single list of instructions.

During longer sessions, newer context occasionally influenced behaviour more than earlier instructions, resulting in inconsistent application quality.

## Decision

Introduce an explicit three-tier rule hierarchy:

1. Safety
2. Quality
3. Task

Lower-priority rules can never override higher-priority rules.

## Alternatives Considered

- Longer flat prompt
- Repeating important rules throughout the prompt
- Multiple prompts for different workflow stages

## Consequences

### Benefits

- More predictable behaviour
- Improved consistency
- Easier maintenance

### Trade-offs

- Longer master prompt
- More effort required when updating rules

---

# ADR-003 — Treat Browser Content as Untrusted

**Status**

✅ Accepted (v3)

## Context

Job descriptions originate from third-party websites and may contain instructions intended to manipulate AI systems.

Even legitimate listings may accidentally include text that conflicts with workflow behaviour.

## Decision

Treat all browser content as data rather than instructions.

Any embedded prompt-like content is ignored and surfaced to the user if necessary.

## Alternatives Considered

- Keyword blocklists
- Trust listings from verified employers
- Ignore only known prompt injection patterns

## Consequences

### Benefits

- Protects against prompt injection
- Predictable behaviour
- Stronger operational safety

### Trade-offs

- Occasional false positives
- Additional user review in edge cases

---

# ADR-004 — Session Limit

**Status**

✅ Accepted (v2)

## Context

As tailoring became increasingly automated, the limiting factor shifted from generation speed to decision quality.

Long application sessions introduced review fatigue and reduced consistency.

## Decision

Limit every session to a maximum of ten submitted applications.

The workflow enforces this limit automatically.

## Alternatives Considered

- No limit
- Time-based session limits
- Soft warning after ten applications

## Consequences

### Benefits

- More consistent review quality
- Reduced decision fatigue
- Better application targeting

### Trade-offs

- Lower daily throughput
- Some suitable roles deferred to future sessions

---

# ADR-005 — Google Sheets for Application Tracking

**Status**

✅ Accepted (v1)

## Context

Application history needed to persist across sessions while remaining easy to inspect and edit.

The solution also needed minimal setup and low operational overhead.

## Decision

Store application history in Google Sheets using a fixed schema.

## Alternatives Considered

- Supabase
- Notion
- Local CSV
- SQLite

## Consequences

### Benefits

- Zero infrastructure
- Familiar interface
- Easy manual corrections
- Accessible outside the workflow

### Trade-offs

- No relational queries
- Manual schema management
- Limited scalability

---

# ADR-006 — Separate Explicit Requirements from Model Assumptions in Match Scoring

**Status**

✅ Accepted (v5)

## Context

The requirements coverage component of the match score rubric occasionally reflected requirements the evaluator inferred from a job title or industry convention, rather than requirements stated in the posting. This produced scores below the apply threshold for roles that were, on the literal text, a strong fit, and the gap was only caught through manual re-evaluation.

## Decision

Extract explicit requirements from the posting before scoring. Score requirements coverage only against that list. Log any requirement the evaluator is inferring beyond the literal text as a separate, visible assumption with a risk level, rather than letting it silently affect the score.

## Alternatives Considered

- Manually re-reading every below-threshold role before skipping it
- Lowering the apply threshold to catch more false negatives
- Asking the evaluator to "consider the full context" of the role, without separating explicit and inferred requirements

## Consequences

### Benefits

- Requirements coverage score is traceable to specific posting text
- Assumptions are visible at review time instead of surfacing only after manual pushback
- Reduces false negatives without lowering the apply threshold

### Trade-offs

- Slightly longer evaluation output per role
- Depends on the evaluator consistently distinguishing "stated" from "implied," which varies with posting quality

---

# Key Lessons

Across all six decisions, a consistent pattern emerged.

The workflow deliberately prioritises:

- Trust over autonomy
- Predictability over flexibility
- Quality over throughput
- Transparency over hidden automation
- Visible reasoning over invisible inference

These principles shaped the product more than any individual prompt or implementation detail.
