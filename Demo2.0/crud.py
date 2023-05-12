from models import *


def select_user(username, password):
    user = User.query.filter_by(email=username, password=password).first()
    return user


def insert_user(username, password):
    user = User()
    user.email = username
    user.password = password
    db.session.add(user)
    db.session.commit()
    return user in db.session


def select_questions(quiz_id):
    questions = Question.query.filter_by(quiz_id=quiz_id).all()
    result = []
    for question in questions:
        result.append({
            'question_id': question.question_id,
            'question_text': question.question_text,
            'option1': question.option1,
            'option2': question.option2,
            'option3': question.option3,
            'sign': question.sign.name,
            'image_url': question.sign.image_url,
            'answer': question.answer
        })
    return result


def select_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    return quiz.quizname


def insert_userquizscore(quiz_id, score, user_id):
    userquizscore = UserQuizScore()
    userquizscore.user_id = user_id
    userquizscore.quiz_id = quiz_id
    userquizscore.score = score
    db.session.add(userquizscore)
    db.session.commit()
    return userquizscore


def insert_useranswers(useranswers, userquizscore):
    for useranswer in useranswers:
        useranswer['userquiz_id'] = userquizscore.userquiz_id
        useranswer['quiz_id'] = userquizscore.quiz_id
    db.session.bulk_insert_mappings(UserAnswer, useranswers)
    db.session.commit()


def select_userquizscores(user_id):
    userquizscores = UserQuizScore.query.filter_by(user_id=user_id).all()
    result = []
    for userquizscore in userquizscores:
        result.append({
            'userquiz_id': userquizscore.userquiz_id,
            'score': userquizscore.score,
            'quiz_id': userquizscore.quiz_id,
            'time': userquizscore.time,
            'quizname': userquizscore.quiz.quizname
        })
    return result


def select_userquizscore(userquiz_id):
    userquizscore = UserQuizScore.query.get(userquiz_id)
    useranswers = userquizscore.useranswers
    result = []
    for useranswer in useranswers:
        result.append({
            'question_id': useranswer.question.question_id,
            'question_text': useranswer.question.question_text,
            'option1': useranswer.question.option1,
            'option2': useranswer.question.option2,
            'option3': useranswer.question.option3,
            'sign': useranswer.question.sign.name,
            'image_url': useranswer.question.sign.image_url,
            'answer': useranswer.question.answer,
            'user_answer': useranswer.user_answer
        })
    return {
        'score': userquizscore.score,
        'quizname': userquizscore.quiz.quizname,
        'useranswers': result
    }


def select_sign(sign_id):
    sign = Sign.query.get(sign_id)
    reviews = []
    for review in sign.reviews:
        reviews.append({
            'review_id': review.review_id,
            'comment_text': review.comment_text,
            'created_at': review.created_at
        })
    return {'name': sign.name, 'image_url': sign.image_url, 'description': sign.description,
            'reviews': reviews}

def select_common(common_id):
    region = Regional.query.get(common_id)
    return {'name': region.name, 'common_url': region.common_url, 'west_url': region.west_url, 'southwest_url': region.southwest_url,'midwest_url': region.midwest_url,'south_url': region.south_url,'northeast_url': region.northeast_url,}

def insert_review(comment_text, user_id, sign_id):
    review = Review()
    review.comment_text = comment_text
    review.user_id = user_id
    review.sign_id = sign_id
    db.session.add(review)
    db.session.commit()
    return review in db.session


def select_sign_category():
    sign_categories = SignCategory.query.all()
    unique_signs = set()
    unique_categories = set()
    nodes = []
    links = []

    for sign_category in sign_categories:
        sign = sign_category.sign
        category = sign_category.category

        if sign not in unique_signs:
            nodes.append({'id': 's' + str(sign.sign_id), 'name': sign.name, 'category': 0})
            unique_signs.add(sign)

        if category not in unique_categories:
            nodes.append({'id': 'c' + str(category.category_id), 'name': category.name, 'category': 1})
            unique_categories.add(category)

        links.append({'source': 's' + str(sign.sign_id), 'target': 'c' + str(category.category_id)})

    result = {'nodedata': nodes, 'linkdata': links}
    return result


def select_quizzes():
    quizzes = Quiz.query.all()
    result = []
    for quiz in quizzes:
        result.append({
            'quiz_id': quiz.quiz_id,
            'quizname': quiz.quizname
        })
    return result

def quizzes_page():
    quizzes = select_quizzes()
    response = {
        'quizzes': quizzes
    }
    return JsonResult.success("Get the list of quizzes successfully", response)


def create_sign(name, image_url, description):
    """Create and return a new sign."""
    sign = Sign(name=name, image_url=image_url, description=description)
    return sign

def create_category(category_id, name):
    """Create and return a new category."""
    category = Category(category_id=category_id, name=name)
    return category

def create_signcategory(sign_id, category_id):
    """Create and return a new signcategory."""
    signcategory = SignCategory(sign_id=sign_id, category_id=category_id)
    db.session.add(signcategory)
    db.session.commit()
    return signcategory

def create_regional(common_id, name, common_url, west_url, southwest_url, south_url, midwest_url, northeast_url):
    """Create and return a new category."""
    regional = Regional(common_id=common_id, name=name, common_url=common_url, west_url=west_url, southwest_url=southwest_url, south_url=south_url, midwest_url=midwest_url, northeast_url=northeast_url)
    return regional

def create_question(question_id, quiz_id, question_text, option1, option2, option3, answer, sign_id):
    question = Question(question_id=question_id, quiz_id=quiz_id,question_text=question_text,option1=option1,option2=option2,option3=option3,answer=answer,sign_id=sign_id)
    db.session.add(question)
    db.session.commit()
    return question

def create_quiz(quiz_id, quizname):
    quiz = Quiz(quiz_id=quiz_id, quizname=quizname)
    return quiz

def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    return user

def get_users():
    return User.query.all()

def get_user_by_id(user_id):
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()

if __name__ == "__main__":
    from server import app

    connect_to_db(app)