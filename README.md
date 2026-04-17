# FOSSEE Workshop Booking - UI/UX Enhancement Submission

This repository contains a React-based UI/UX redesign for the workshop booking flow, focused on mobile-first usage, accessibility, performance-minded implementation, and clearer workshop request navigation.

Repository link:
https://github.com/PrakC7/FOSSEE

## What Was Improved

- Workflow-first dashboard structure for instructors and coordinators
- Clear workflow and status areas with backend-ready empty states
- Accessible workshop request form with inline validation feedback
- Queue section prepared for backend wiring without placeholder records
- Responsive layouts for mobile, tablet, and desktop breakpoints
- SEO metadata updates for better page discoverability

## Setup Instructions

### Backend (Django)

1. Create virtual environment and activate it.
2. Install dependencies.
3. Run migrations.
4. Start backend server.

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend URL:
http://127.0.0.1:8000/

### Frontend (React UI)

```bash
cd frontend
npm install
npm run dev
```

Frontend URL (default):
http://127.0.0.1:5173/

### Frontend Production Build Check

```bash
cd frontend
npm run build
```

## Reasoning (Required)

### 1) What design principles guided your improvements?

I focused on clarity first:

- Visual hierarchy: the most important information (role, status counts, workflow progress) appears first.
- Progressive disclosure: detailed interactions come after summary cards so users can orient quickly.
- Action proximity: request form and role guidance are placed close to workflow context.
- Consistency: repeated card, chip, and badge patterns reduce cognitive load.

### 2) How did you ensure responsiveness across devices?

- Designed mobile layout first with single-column stacking.
- Used CSS grid transitions at tablet and desktop breakpoints for denser content.
- Kept controls touch-friendly with larger hit areas and rounded components.
- Ensured content remains readable without horizontal scrolling.

### 3) What trade-offs did you make between design and performance?

- I used lightweight CSS and plain React state rather than heavy UI libraries.
- I avoided animation-heavy interactions and limited motion to short reveal transitions.
- I removed hardcoded sample records and kept backend-ready placeholders to avoid misleading data.
- I used simple semantic markup and small component logic to keep bundle growth controlled.

### 4) What was the most challenging part and how did you approach it?

The hardest part was balancing visual richness with mobile usability while keeping the interface fast and readable. I addressed this by building each feature in slices: first information structure, then form interaction, then backend-ready queue placeholders without fake data. That iterative approach made it easier to validate UX at each step and avoid over-designing.

## Visual Showcase

Before screenshots:

- [Mobile Before](docs/screenshots/before/mobile-before.png)
- [Desktop Before](docs/screenshots/before/desktop-before.png)

![Mobile Before](docs/screenshots/before/mobile-before.png)
![Desktop Before](docs/screenshots/before/desktop-before.png)

After screenshots:


**After screenshots pending update to reflect current UI (no badges in section corners).**

- [Mobile After](docs/screenshots/after/mobile-after.png)
- [Desktop After](docs/screenshots/after/desktop-after.png)

![Mobile After](docs/screenshots/after/mobile-after.png)
![Desktop After](docs/screenshots/after/desktop-after.png)

Detailed impact notes are available in [docs/impact_notes.md](docs/impact_notes.md).

## Submission Checklist

- [x] Code is readable and well-structured
- [x] Git history shows progressive work
- [x] README includes reasoning answers and setup instructions
- [x] Screenshots included
- [x] Code documented where necessary

## Existing Backend Notes

The original Django backend remains in this repository. This screening submission focuses on the React UI/UX enhancement workflow under [frontend](frontend).
