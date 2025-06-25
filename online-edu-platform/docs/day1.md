Exactly—that's a great place to start. Here’s a clean and simple step-by-step to kick off your Django-based project properly:

---

### 📁 Step 1: Create a Project Folder

```bash
mkdir online-edu-platform
cd online-edu-platform
```

This keeps all your code, virtual environment, and project files in one place.

---

### 🐍 Step 2: Set Up a Virtual Environment (Best Practice)

```bash
python3 -m venv venv
source venv/bin/activate
```

Now your Python environment is isolated—nothing system-wide gets affected.

---

### 📦 Step 3: Install Django (and optionally Django REST Framework)

```bash
pip install django djangorestframework
```

You can always install more packages later.

---

### 🚀 Step 4: Create Your Django Project

```bash
django-admin startproject edu_auth .
```

The `.` at the end means it installs the project in your current folder instead of a nested one.

---

### 🧪 Step 5: Run It to Confirm It Works

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` in your browser—you should see the Django welcome page!

---

Want help with the next step, like building your `users` app or designing the database schema? Just say the word—we’ll keep the momentum going! 💡🧱🔥

### Ref:

python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
June 25, 2025 - 23:36:50
Django version 5.2.3, using settings 'edu_auth.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

WARNING: This is a development server. Do not use it in a production setting. Use a production WSGI or ASGI server instead.
For more information on production servers see: https://docs.djangoproject.com/en/5.2/howto/deployment/
[25/Jun/2025 23:37:08] "GET / HTTP/1.1" 200 12068
Not Found: /favicon.ico
[25/Jun/2025 23:37:08] "GET /favicon.ico HTTP/1.1" 404 2210
^C(venv) teng@yunhaoteng:~/Development/billteng.github.io/online-edu-platform
$ python manage.py migrate
Operations to perform:
Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
Applying contenttypes.0001_initial... OK
Applying auth.0001_initial... OK
Applying admin.0001_initial... OK
Applying admin.0002_logentry_remove_auto_add... OK
Applying admin.0003_logentry_add_action_flag_choices... OK
Applying contenttypes.0002_remove_content_type_name... OK
Applying auth.0002_alter_permission_name_max_length... OK
Applying auth.0003_alter_user_email_max_length... OK
Applying auth.0004_alter_user_username_opts... OK
Applying auth.0005_alter_user_last_login_null... OK
Applying auth.0006_require_contenttypes_0002... OK
Applying auth.0007_alter_validators_add_error_messages... OK
Applying auth.0008_alter_user_username_max_length... OK
Applying auth.0009_alter_user_last_name_max_length... OK
Applying auth.0010_alter_group_name_max_length... OK
Applying auth.0011_update_proxy_permissions... OK
Applying auth.0012_alter_user_first_name_max_length... OK
Applying sessions.0001_initial... OK
(venv) teng@yunhaoteng:~/Development/billteng.github.io/online-edu-platform

## Running server screen:

python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
June 25, 2025 - 23:55:48
Django version 5.2.3, using settings 'edu_auth.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

WARNING: This is a development server. Do not use it in a production setting. Use a production WSGI or ASGI server instead.
For more information on production servers see: https://docs.djangoproject.com/en/5.2/howto/deployment/
[25/Jun/2025 23:56:05] "GET / HTTP/1.1" 200 12068
Not Found: /favicon.ico
[25/Jun/2025 23:56:06] "GET /favicon.ico HTTP/1.1" 404 2210
^C(venv) teng@yunhaoteng:~/Development/billteng.github.io/online-edu-platform
