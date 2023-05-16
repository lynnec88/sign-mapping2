import json
import unittest
from flask import session
from server import app

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
        with self.client.session_transaction() as session:
            session['user_id'] = 1
            session['email'] = 'test@example.com'

    def test_login_successful(self):
        with self.client as client:
            with client.session_transaction() as session:
                session['user_id'] = 1
                session['email'] = 'test@example.com'

            response = client.post('/login', json={'username': 'user0@test.com', 'password': 'test'})
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'Login successful')
            self.assertIn('user_id', session)
            self.assertIn('email', session)

    def test_login_invalid_credentials(self):
        with self.client as client:
            response = client.post('/login', json={'username': 'user0@test.com', 'password': 'wrongpassword'})
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'Login failed, please check if your username or password is wrong')
            self.assertNotIn('user_id', session)
            self.assertNotIn('email', session)

def test_logout(self):
    with self.app.test_request_context():
        # set up the session
        with self.client.session_transaction() as session:
            session['user_id'] = 1
            session['email'] = 'test@example.com'

        # try the logout request
        response = self.client.post('/logout')
        data = json.loads(response.get_data(as_text=True))

        # assert the response status code and the expected data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'You are logged out')

        # access the session from the test client
        with self.client.session_transaction() as session:
            self.assertNotIn('user_id', session)
            self.assertNotIn('email', session)


if __name__ == '__main__':
    unittest.main()
