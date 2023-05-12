import json
import pytest
from flask import session
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with client.session_transaction() as session:
            session['user_id'] = 1
            session['email'] = 'test@example.com'
        yield client

def test_login_successful(client):
    response = client.post('/login', json={'username': 'user0@test.com', 'password': 'test'})
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'Login successful'
    assert 'user_id' in session
    assert 'email' in session

def test_login_invalid_credentials(client):
    response = client.post('/login', json={'username': 'user0@test.com', 'password': 'wrongpassword'})
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'Login failed, please check if your username or password is wrong'
    assert 'user_id' not in session
    assert 'email' not in session

def test_logout(client):
    response = client.post('/logout')
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'You are logged out'
    assert 'user_id' not in session
    assert 'email' not in session
