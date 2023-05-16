import unittest
from flask import jsonify
from flask.testing import FlaskClient
from server import app


class ServerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.testing = True
        self.client = self.app.test_client()
        self.context = self.app.app_context()
        self.context.push()

    def tearDown(self):
        self.context.pop()

    def test_home_page(self):
        response = self.client.post('/home')
        self.assertEqual(response.status_code, 302) 
        if response.status_code == 200:
            data = response.get_json()
            self.assertEqual(data['message'], "Loading data successfully")

    def test_login(self):
        response = self.client.post('/login', json={'username': 'test_user', 'password': 'test_password'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], "Login successful")

        response = self.client.post('/login', json={'username': 'invalid_user', 'password': 'invalid_password'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], "Login failed, please check if your username or password is wrong")


if __name__ == '__main__':
    unittest.main()
