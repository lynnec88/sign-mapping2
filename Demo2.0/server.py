import json
from flask_cors import CORS
from flask import Flask, request, jsonify, session

import config
from crud import *
from interceptor import login_required
from models import JsonResult

app = Flask(__name__)
app.secret_key = "dev"
app.debug = True  # Enable Flask debugging mode
app.config.from_object(config)
CORS(app)
db.init_app(app)


@app.route('/home', methods=['POST'])
@login_required
def home_page():
    return JsonResult.success("Loading data successfully", select_sign_category())


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = select_user(username, password)
    if user:
        session['user_id'] = user.user_id
        session['email'] = user.email
        return JsonResult.success("Login successful")
    else:
        return JsonResult.fail("Login failed, please check if your username or password is wrong")


@app.route('/logout', methods=['POST'])
def logout():
    if 'user_id' in session:
        session.clear()
        return JsonResult.success("You are logged out")
    else:
        return JsonResult.fail("You are not logged in")


@app.route('/quizzes', methods=['POST'])
@login_required
def quizzes_page():
    quizzes = select_quizzes()
    return JsonResult.success("Get the list of quizzes successfully", quizzes)


@app.route('/quiz/<quiz_id>', methods=['POST'])
@login_required
def quiz_page(quiz_id):
    questions = select_questions(quiz_id)
    quizname = select_quiz(quiz_id)
    return JsonResult.success("Acquire data successfully", {'quizname': quizname, 'questions': questions})


@app.route('/useranswers', methods=['POST'])
@login_required
def save_quiz_score():
    score = request.form.get('score')
    quiz_id = request.form.get('quiz_id')
    user_id = session['user_id']
    useranswers = json.loads(request.form.get('answers'))
    print(useranswers)
    userquizscore = insert_userquizscore(quiz_id, score, user_id)
    insert_useranswers(useranswers, userquizscore)

    if userquizscore in db.session:
        return JsonResult.success('Submitted successfully')
    else:
        return JsonResult.fail('Submission failure')


@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    query = insert_user(username, password)
    if query:
        return JsonResult.success('Registration successful. You will now be redirected to the login page.')
    else:
        return JsonResult.fail('Registration failed')


@app.route('/scores', methods=['POST'])
@login_required
def scores_page():
    user_id = session['user_id']
    userquizscores = select_userquizscores(user_id)
    return JsonResult.success("Get results list successfully", userquizscores)


@app.route('/answer/<userquiz_id>', methods=['GET', 'POST'])
@login_required
def answer_page(userquiz_id):
    if request.method == 'GET':
        userquizscore = select_userquizscore(userquiz_id)
        return JsonResult.success("Get test results successfully", userquizscore)
    elif request.method == 'POST':
        # Retrieve the user's answers from the request data
        user_answers = request.get_json().get('user_answers')
        
        # Calculate the user's score
        # score = calculate_user_score(userquiz_id, user_answers)
        
        # Update the user_quiz table with the new score
        # update_user_quiz(userquiz_id, score, user_answers)
        
        return JsonResult.success("Test submission successful")


@app.route('/sign/<sign_id>', methods=['POST'])
@login_required
def sign_page(sign_id):
    asl = select_sign(sign_id)
    # fetch.data
    data = request.get_json()
    print(data)
    return JsonResult.success("got the Sign information successfully", asl)

@app.route('/regional/<common_id>', methods=['POST'])
@login_required
def regional_page(common_id):
    vasl = select_common(common_id)
    # fetch.data
    data = request.get_json()
    print(data)
    return JsonResult.success("got the Sign information successfully", vasl)


@app.route('/review/<sign_id>', methods=['POST'])
@login_required
def save_review(sign_id):
    review = Review()
    review.comment_text = request.json['review']
    review.user_id = session['user_id']
    review.sign_id = sign_id
    db.session.add(review)
    db.session.commit()
    if review in db.session:
        return JsonResult.success('Comment successfully!')
    else:
        return JsonResult.fail('Comment failed')


if __name__ == '__main__':
    # db.create_all()
    app.run()
