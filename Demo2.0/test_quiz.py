import json
import pytest
from flask import session

from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with client.session_transaction() as sess:
            sess['user_id'] = 1  # Set the user ID in the session for authentication, if needed
        yield client

def test_quizzes_page(client):
    # Perform a POST request to the '/quizzes' endpoint
    response = client.post('/quizzes')
    data = response.get_json()

    # Print the contents of data['data']
    print(data['data'])

    # Assert the response status code and the expected data
    assert response.status_code == 200
    assert data['message'] == 'Get the list of quizzes successfully'
    assert any('quiz_id' in item for item in data['data'])  # Check if 'quiz_id' key exists in any dictionary within 'data'



def test_quiz_page(client):
    # Perform a POST request to the '/quiz/<quiz_id>' endpoint
    quiz_id = 1  # Replace with a valid quiz ID
    response = client.post(f'/quiz/{quiz_id}')
    data = response.get_json()

    # Assert the response status code and the expected data
    assert response.status_code == 200
    assert data['message'] == 'Acquire data successfully'
    assert 'quizname' in data['data']  # Check for 'quizname' key within the 'data' dictionary

