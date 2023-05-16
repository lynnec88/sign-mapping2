import unittest
from flask import session
from server import app

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_quizzes_page(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['user_id'] = 1

            response = client.post('/quizzes')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'Get the list of quizzes successfully')
            self.assertTrue(any('quiz_id' in item for item in data['data']))

    def test_quiz_page(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['user_id'] = 1

            quiz_id = 1
            response = client.post(f'/quiz/{quiz_id}')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'Acquire data successfully')
            self.assertIn('quizname', data['data'])

if __name__ == '__main__':
    unittest.main()
