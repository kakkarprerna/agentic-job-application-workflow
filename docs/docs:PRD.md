# Product Requirements Document (PRD)

**Project:** Agentic Job Application Workflow  
**Version:** 3.0  
**Status:** Implemented  
**Author:** Prerna  
**Last Updated:** July 2026

---

# Executive Summary

Job applications require significant manual effort despite many tasks being repetitive. While generative AI can automate tailoring and content generation, unrestricted automation introduces risks such as inaccurate applications, inconsistent outputs, and unintended submissions.

This project explores how an AI-assisted workflow can reduce repetitive work while preserving human judgement through structured governance, approval checkpoints, and deterministic rules.

---

# Problem Statement

Preparing a high-quality job application typically requires:

- Understanding the role
- Evaluating whether it is a strong fit
- Tailoring application materials
- Completing the application
- Recording the application for future follow-up

The process typically takes **30–60 minutes per application**.

Existing automation tools optimise primarily for speed, often producing generic applications or removing users from critical decisions.

The opportunity is to reduce repetitive work **without compromising quality, accuracy, or user trust.**

---

# Target User

**Primary User**

Senior Individual Contributor Product Manager actively applying for Product Management roles across Spain and remote European markets.

---

# Job to be Done

> When applying for Product Management roles, I want repetitive application tasks to be automated while retaining control over final submissions so that I can apply consistently without sacrificing application quality.

---

# Product Goals

The workflow should:

- Reduce repetitive manual work
- Maintain consistently high-quality applications
- Prevent inaccurate or unintended submissions
- Improve transparency of AI decision making
- Maintain an auditable application history

---

# Success Metrics

Success is evaluated across four dimensions.

## Efficiency

- Average application preparation time
- Applications completed per session
- Estimated manual effort saved

## Quality

- First-pass approval rate
- Recruiter response rate
- Interview conversion rate
- Applications requiring revision

## Reliability

- Approval gate compliance (Target: 100%)
- Prompt injection detection rate (Target: 100%)
- Successful tracker logging (Target: 100%)
- Duplicate application detection

## User Experience

- Administrative tracking time
- Manual workflow interruptions
- User confidence in generated materials

---

# Functional Requirements

## Search & Discovery

- Search for Product Management roles matching predefined criteria.
- Exclude low-fit opportunities before tailoring begins.
- Record reasons for skipped roles.

---

## Application Generation

- Tailor CV and cover letter using approved source materials.
- Prioritise experience relevant to each role.
- Never fabricate experience or metrics.

---

## Governance

- Require explicit human approval before submission.
- Apply deterministic rule hierarchy.
- Treat browser content as untrusted.
- Ignore prompt injection attempts.

---

## Submission

- Submit only after approval.
- Record every application in the tracker.
- Prevent duplicate submissions.

---

## Session Management

- Limit sessions to ten completed applications.
- Preserve workflow state if interrupted.

---

# Non-Functional Requirements

| Requirement | Description |
|-------------|-------------|
| Reliability | Workflow behaves consistently across sessions |
| Safety | No unapproved submissions |
| Transparency | Every decision is reviewable |
| Maintainability | Rules can be updated without redesigning the workflow |
| Performance | Workflow reduces overall preparation time |

---

# User Journey

```text
Search Jobs
      ↓
Evaluate Fit
      ↓
Tailor Application
      ↓
Human Review
      ↓
Approve?
 ↓           ↓
Revise     Submit
               ↓
      Update Tracker
```

---

# Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| Prompt injection | Ignore instructions and continue safely |
| Missing required information | Pause and request user input |
| Duplicate application | Prevent resubmission |
| Interrupted session | Preserve workflow state without submission |

---

# Out of Scope

The following capabilities were intentionally excluded from Version 3.

| Feature | Rationale |
|---------|-----------|
| Automatic follow-up emails | Requires human judgement and context |
| Support for multiple job boards | Focus on reliability before expanding platforms |
| Fully autonomous submission | Conflicts with trust and governance objectives |
| Automated interview scheduling | Outside the scope of application preparation |

---

# Risks

| Risk | Mitigation |
|------|------------|
| Hallucinated experience | Mandatory approval gate |
| Prompt injection | Browser content treated as untrusted |
| Poor role matching | Manual fit review |
| Decision fatigue | Session limit of ten applications |

---

# Design Principles

The workflow is guided by five principles.

1. Human-in-the-loop decision making
2. Trust over autonomy
3. Predictable behaviour through explicit rules
4. Transparency before automation
5. Quality over throughput

---

# Future Opportunities

Potential future enhancements include:

- Company research integration
- Confidence scoring for role fit
- Recruiter response analytics
- Follow-up scheduling
- Multi-platform support
- A/B testing of application materials
- Evaluation dashboards
- Automated regression testing