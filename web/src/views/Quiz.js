import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Quiz = () => {
    const {quiz_id} = useParams()
    const [quiz,setQuiz] = useState({quizname:'',questions:[]})
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        axios.post(`/api/quiz/${quiz_id}`).then(res=>{
            setQuiz(res.data.data)
        })
    },[quiz_id])

    const updateAnswer=(answer, answers)=>{
        const updatedAnswers = answers.map(prevAnswer => {
            if (prevAnswer.question_id === answer.question_id) {
                return answer;
            }
            return prevAnswer;
        });
        const foundAnswer = answers.find(prevAnswer => prevAnswer.question_id === answer.question_id);
        if (!foundAnswer) {
            updatedAnswers.push(answer);
        }
        return updatedAnswers;
    }

    const handleSubmit = () => {
        const totalQuestions = quiz.questions.length;
        const correctAnswers = userAnswers.filter(answer => {
            const question = quiz.questions.find(q => q.question_id === answer.question_id);
            return question.answer === answer.user_answer;
        }).length;
        const score = Math.round(correctAnswers / totalQuestions * 100);

        const payload = {
            quiz_id: quiz_id,
            score: score,
            answers: JSON.stringify([...userAnswers])
        };
        axios.defaults.headers =  {'content-type': 'application/x-www-form-urlencoded'}
        axios.post("/api/useranswers", payload).then(res=>{
            alert(res.data.message);
            navigate("/scores")
        })
    }

    return (
        <div className="pb-3" style={{ backgroundColor: "white" }}>
            <div className="container marketing">
                <h1 className="my-5">{quiz.quizname}</h1>
                {quiz.questions.map(question =>
                    <div className="row featurette card my-3" style={{ flexDirection: "row" }} key={question.question_id}>
                        <div className="col-md-7 align-self-center p-lg-5">
                            <h2 className="featurette-heading fw-normal my-3">
                                {question.question_text}
                            </h2>
                            <div className="lead">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="1" name={question.question_id}
                                           onChange={(e)=>{
                                        const answer = {
                                            question_id: question.question_id,
                                            user_answer: e.target.value
                                        };
                                        setUserAnswers(prevAnswers => updateAnswer(answer, prevAnswers));
                                    }}/>
                                    <label className="form-check-label">{question.option1}</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="2" name={question.question_id}
                                           onChange={(e)=>{
                                        const answer = {
                                            question_id: question.question_id,
                                            user_answer: e.target.value
                                        };
                                        setUserAnswers(prevAnswers => updateAnswer(answer, prevAnswers));
                                    }}/>
                                    <label className="form-check-label">{question.option2}</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="3" name={question.question_id}
                                           onChange={(e)=>{
                                        const answer = {
                                            question_id: question.question_id,
                                            user_answer: e.target.value
                                        };
                                        setUserAnswers(prevAnswers => updateAnswer(answer, prevAnswers));
                                    }}/>
                                    <label className="form-check-label">{question.option3}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img className="bd-placeholder-img card-img-top m-auto" src={"/" + question.image_url} alt=''/>
                        </div>
                    </div>
                )}
                <div className="row justify-content-center my-5">
                    <button className="btn btn-primary col-2 btn-lg" onClick={handleSubmit} style={{height:'50px'}}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;