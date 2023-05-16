from functools import wraps
from flask import session, url_for, redirect

def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('sign_page', sign_id=1))
        return func(*args, **kwargs)

    return wrapper
