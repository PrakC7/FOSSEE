# Workshop Booking Submission Plan (24 Hours)

**Deadline:** before 15 April  
**Objective:** deliver clear improvements in **workflow clarity**, **form/user feedback UX**, and **optimization** with small commit-sized work.

---

## How To Use This Plan

- Complete one step at a time.
- Commit after each step.
- Keep commits small and focused.
- Do not start next step before basic verification.

### If You Downloaded ZIP Instead Of Cloning

If this folder has no `.git` directory, pushes will fail. Run these once before Step 1:

```bash
git init
git checkout -b newly-added-features/improvements
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

Then continue with the sequence below.

---

## FOSSEE Alignment Re-check (Do This First)

### What evaluators are likely looking for
- Improve the existing workshop booking flow, not a full rewrite.
- Respect current architecture (Django + Bootstrap + role-based workflow).
- Show practical, incremental improvements with clear reasoning.

### What to avoid
- Do not redesign the entire app from scratch.
- Do not add unrelated AI/chatbot/ML features.
- Do not add heavy complexity that is hard to justify in 24 hours.

### Critical things commonly missed (must not miss)
- Role correctness: coordinator/instructor/admin behavior must remain correct.
- Workflow consistency: pending/approved/rejected/postponed state visibility.
- Validation quality: date/status/form validation must be explicit and user-friendly.
- Evidence quality: before/after screenshots + measurable impact notes.
- Stability: avoid risky schema-breaking changes before deadline.

### Scope lock for final submission (pick only these 3)
1. Status tracking + workflow clarity
2. Dashboard + form UX/feedback improvements
3. Query/path optimization on key views

If any task does not support one of the above 3, postpone it.

---

## Priority Modes

### P1 (Must Finish)
- Workflow status tracking clarity
- Dashboard/form UX feedback improvements
- Core query optimizations
- Final impact summary in README

### P2 (Should Finish)
- Responsive polish and filter persistence
- After screenshots

### P3 (If Time Allows)
- Extra tests
- Short caching for stats

---

## Exact Execution Order (Use This Section Only)

This is the final sequence to follow. Each step includes exact folder/file targets.

### Step 1 - Branch and baseline evidence (20-30 min)
- [ ] Create branch: `newly-added-features/improvements`
- [ ] Create folders: `docs/screenshots/before/` and `docs/screenshots/after/`
- [ ] Capture current screenshots (before):
  - login/dashboard status page
  - public stats page
  - workshop type list page

Files/folders:
- `docs/screenshots/before/`

Commit:
- `docs: add before screenshots and setup submission branch`

### Step 2 - Workflow status clarity in UI (1.5-2 hours) [P1]
Goal: make booking flow state obvious (pending/accepted/rejected/rescheduled cue).

Edit files:
- `workshop_app/templates/workshop_app/workshop_status_instructor.html`
- `workshop_app/templates/workshop_app/workshop_status_coordinator.html`
- `workshop_app/templates/workshop_app/workshop_details.html`

Do:
- [ ] Standardize status badges/colors/text across pages.
- [ ] Add visible section headings: pending, accepted, etc.
- [ ] For date-changed workflows, show clear "Rescheduled" text cue in UI (no schema change).

Commit:
- `ui: improve workflow status visibility for coordinator and instructor`

### Step 3 - Dashboard readability improvements (1.5-2 hours) [P1]
Goal: quick overview of upcoming work and request state.

Edit files:
- `workshop_app/templates/workshop_app/workshop_status_instructor.html`
- `workshop_app/templates/workshop_app/workshop_status_coordinator.html`
- `statistics_app/templates/statistics_app/workshop_public_stats.html`

Do:
- [ ] Add summary cards/blocks at top (counts for key states).
- [ ] Keep existing table data but improve scanability and grouping.
- [ ] Ensure mobile readability for cards and table wrappers.

Commit:
- `ui: add dashboard summaries and improve status page scanability`

### Step 4 - Form UX and validation clarity (1.5-2 hours) [P1]
Goal: reduce confusion in proposal flow.

Edit files:
- `workshop_app/forms.py`
- `workshop_app/templates/workshop_app/propose_workshop.html`
- `workshop_app/views.py`

Do:
- [ ] Improve form help/error text clarity.
- [ ] Add stronger validation feedback for date/type acceptance flow.
- [ ] Disable submit button on submit to avoid duplicate proposals.

Commit:
- `ux: improve propose workshop validation and form feedback`

### Step 5 - Action feedback and notifications (45-60 min) [P1]
Goal: user always gets immediate confirmation after actions.

Edit files:
- `workshop_app/views.py`
- `workshop_app/templates/workshop_app/base.html`

Do:
- [ ] Ensure success/error/info messages exist for accept/reject/date-change/comment actions.
- [ ] Keep messaging concise and user-friendly.

Commit:
- `ux: improve action feedback messages across workshop flow`

### Step 6 - Query optimization on key views (2-3 hours) [P1]
Goal: improve speed without architecture rewrite.

Edit files:
- `workshop_app/views.py`
- `statistics_app/views.py`

Do:
- [ ] Optimize workshop status and details query paths.
- [ ] Optimize public stats query paths.
- [ ] Keep current behavior/permissions unchanged.

Commit:
- `perf: optimize workshop and stats query paths`

### Step 7 - Pagination/filter persistence polish (45-60 min) [P2]
Goal: avoid resetting user context while browsing stats.

Edit files:
- `statistics_app/templates/statistics_app/paginator.html`
- `statistics_app/templates/statistics_app/workshop_public_stats.html`

Do:
- [ ] Preserve all filter params while changing pages.
- [ ] Verify clear/reset still works correctly.

Commit:
- `ux: preserve filters across stats pagination`

### Step 8 - Responsive polish on common layouts (45-60 min) [P2]
Goal: avoid layout breakage and overlapping footer.

Edit files:
- `workshop_app/static/workshop_app/css/base.css`
- `workshop_app/templates/workshop_app/workshop_type_list.html`

Do:
- [ ] Fix footer/content overlap.
- [ ] Improve table and button behavior on small screens.

Commit:
- `style: improve mobile layout stability for common pages`

### Step 9 - Focused tests for changed behavior (60-90 min) [P2]
Goal: show reliability of changes.

Edit files:
- `workshop_app/tests/test_views.py`
- `statistics_app/tests/test_views.py`

Do:
- [ ] Add/adjust tests for status visibility, filter persistence, and core page responses.

Commit:
- `test: add coverage for status workflow and stats filters`

### Step 10 - Final submission evidence (45-60 min) [P1]
Goal: make reviewer understand impact quickly.

Edit files:
- `README.md`
- `docs/impact_notes.md`
- `docs/screenshots/after/`

Do:
- [ ] Add after screenshots.
- [ ] Ensure `docs/screenshots/after/mobile-after.png` and `docs/screenshots/after/desktop-after.png` both open correctly.
- [ ] Write what changed, why, and before-vs-after results.
- [ ] Keep write-up short and concrete.

Commit:
- `docs: add final impact summary and after screenshots`

---

## Final Verification Checklist

- [ ] App starts and key pages load
- [ ] Login/register/status/stats/workshop type list all work
- [ ] Mobile check at 360x800
- [ ] Filters + pagination stay correct
- [ ] Coordinator/instructor/admin permissions still behave correctly
- [ ] Workflow statuses are clearly visible and consistent
- [ ] No obvious console/template errors
- [ ] Commits are clean and small

---

## If Time Is Running Out

Do only these steps in order:
1. Step 2 (Workflow status clarity)
2. Step 4 (Form UX and validation)
3. Step 6 (Query optimization)
4. Step 10 (README + screenshots evidence)

This is the strongest 2-3 improvement bundle for FOSSEE review.
