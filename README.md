## Steps to run the application

1. clone the repository

```
git clone git@github.com:shaikh47/myalice-contact-management.git
```

## Frontend

1. navigate to frontend directory and install dependencies

```
cd contact-management-frontend
npm i
```

2. run the frontend

```
npm run dev
```

## Backend

1. Navigate to the backend directory

```
cd contact-management-backend
```

2. create a new python virtual env

```
python -m venv .venv
```

3. activate the virtual env to terminal (windows)

```
.venv\Scripts\activate
```

4. install the python dependencies

```
pip install djangorestframework django djangorestframework-simplejwt django-cors-headers
```

5. make and apply the database migration files

```
python manage.py makemigrations
python manage.py migrate
```

6. Run the server
```
python manage.py runserver 3001
```