# Product Roadmap

This roadmap prioritises improvements using a simple decision framework:

> **An initiative is prioritised only if it meaningfully improves efficiency, application quality, or workflow reliability without weakening Tier 1 safety rules.**

Safety is non-negotiable. Features that trade trust for speed are intentionally excluded, regardless of implementation effort.

Initiatives are prioritised using **Impact × Effort**, with preference given to improvements that increase product value while preserving predictable behaviour.

---

# Roadmap Overview

| Horizon | Focus |
|----------|-------|
| **Now** | Improve workflow reliability and data quality |
| **Next** | Increase user productivity through assisted automation |
| **Later** | Expand platform coverage and analytical capabilities |
| **Not Planned** | Features that compromise trust or fall outside the product vision |

---

# Now (Next Release)

## Duplicate Application Detection

**Problem**

Reposted jobs with slightly different titles can bypass duplicate detection.

**Objective**

Prevent duplicate applications before tailoring begins.

**Expected Impact**

- Higher workflow reliability
- Better user confidence
- Reduced administrative cleanup

**Priority**

🟢 High Impact · 🟢 Low Effort

---

## Structured Skip Reasons

**Problem**

Free-text skip reasons are difficult to analyse.

**Objective**

Introduce a standard taxonomy for skipped roles.

Example categories:

- Poor product fit
- Seniority mismatch
- Location mismatch
- Compensation mismatch
- Duplicate role
- Insufficient information

**Expected Impact**

- Better analytics
- Improved role filtering
- Higher quality search results over time

**Priority**

🟢 High Impact · 🟢 Low Effort

---

# Next

## Human-in-the-Loop Follow-up Drafts

**Problem**

Writing follow-up messages remains repetitive.

**Objective**

Generate follow-up drafts while keeping final approval with the user.

The workflow prepares a draft three days after an application but never sends messages automatically.

**Expected Impact**

- Reduced administrative effort
- Consistent communication
- Preserved human judgement

**Priority**

🟡 Medium Impact · 🟡 Medium Effort

---

## Application Material Analytics

**Problem**

Application versions are stored but not analysed.

**Objective**

Measure which CV and cover letter variants correlate with recruiter responses.

Potential metrics include:

- Response rate by CV version
- Interview conversion by positioning strategy
- Cover letter effectiveness

**Expected Impact**

- Data-driven optimisation
- Better tailoring decisions
- Continuous improvement

**Priority**

🟡 Medium Impact · 🟢 Low Effort

---

# Later

## Additional Job Platform Support

**Problem**

Some relevant opportunities exist outside LinkedIn.

**Objective**

Support one additional job platform once LinkedIn opportunities no longer provide sufficient coverage.

Platform selection will be based on historical search data rather than assumptions.

**Expected Impact**

- Increased opportunity coverage
- Expanded search capability

**Priority**

🟠 High Effort · Unknown Impact

---

## Product Analytics Dashboard

**Problem**

Workflow metrics currently require manual review.

**Objective**

Provide a dashboard showing:

- Application volume
- Response rate
- Interview conversion
- First-pass approval rate
- Duplicate detection
- Prompt version performance

**Expected Impact**

- Faster product evaluation
- Easier trend analysis
- Better prioritisation decisions

**Priority**

🟠 Medium Effort · High Long-Term Value

---

# Not Planned

The following ideas were considered and intentionally rejected.

## Fully Autonomous Submission

**Reason**

Conflicts with the product's core design principle of maintaining human accountability.

Reference: **ADR-001**

---

## Automated Referral Requests

**Reason**

Professional networking relies on authentic communication.

Automating referral requests risks reducing trust while providing limited productivity gains.

---

## Multi-user Support

**Reason**

The workflow is designed for a single user.

Supporting multiple users would require authentication, permissions, configuration management, and operational support, effectively creating a different product with distinct requirements.

---

# Prioritisation Principles

Future roadmap decisions follow four principles:

1. Trust over autonomy
2. Quality over throughput
3. Evidence over intuition
4. Simplicity before feature expansion

No initiative is prioritised solely because it is technically feasible.

Each addition must measurably improve the product while preserving the workflow's safety guarantees.
