# Guide To Install And Run

## Prerequisites

- Python 3
- pip
- Node.js and npm (for frontend preview)

Validated locally with:

- Python 3.12.7
- Django 3.0.7

## Backend Setup (Django)

1. Clone the repository.

    git clone https://github.com/FOSSEE/workshop_booking.git

2. Create and activate a virtual environment.

    Windows PowerShell:

    python -m venv .venv
    .\.venv\Scripts\Activate.ps1

3. Install backend dependencies.

    pip install -r requirements.txt

4. Run migrations.

    python manage.py makemigrations
    python manage.py migrate

5. Create a superuser.

    python manage.py createsuperuser

6. Start the backend server.

    python manage.py runserver

7. Open admin panel and login using superuser credentials.

    http://127.0.0.1:8000/admin

## Admin Configuration

1. In admin, create one group named instructor and grant required permissions.
2. By default, newly registered users are coordinators.
3. For instructor accounts, set profile position to instructor and add user to instructor group.
4. Confirm required environment variables are configured in settings before production use.

## Frontend Setup (React UI/UX layer)

1. Open a new terminal.
2. Go to frontend folder.

    cd frontend

3. Install frontend packages.

    npm install

4. Start frontend dev server.

    npm run dev

## Instructor Flow

1. Instructors can create workshops in Create Workshop.
2. Instructors can view monthly counts and upcoming workshops in Statistics > Workshop Statistics.
3. Instructors can view and post comments on coordinator profiles from Profile Statistics or Workshop Status page.

## Coordinator Flow

1. Coordinators can send workshop proposals through Workshops > Propose a Workshop.

