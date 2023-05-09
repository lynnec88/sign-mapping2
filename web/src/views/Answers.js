import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Answers = () => {
  const { userquiz_id } = useParams();
  const [userquizscore, setUserquizscore] = useState({ useranswers: [] });

  const fetchAnswer = async (userquiz_id) => {
    const response = await fetch(`/answer/${userquiz_id}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchAnswer(userquiz_id).then((data) => {
      setUserquizscore(data.data);
    });
  }, [userquiz_id]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="container marketing">
        <h1 className="my-5">{userquizscore.quizname}: {userquizscore.score}%</h1>
        {userquizscore.useranswers.map((useranswer) => (
          <div className="row featurette card my-3" style={{ flexDirection: 'row' }} key={useranswer.id}>
            <div className="col-md-7 align-self-center p-lg-5">
              <h2 className="featurette-heading fw-normal my-3">
                {useranswer.question_text}
              </h2>
              <div className="lead">
                <div className="form-check">
                  <input className="form-check-input" type="radio"
                         checked={useranswer.user_answer === '1'} disabled />
                  <label className="form-check-label">
                    {useranswer.option1}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio"
                         checked={useranswer.user_answer === '2'} disabled />
                  <label className="form-check-label">
                    {useranswer.option2}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio"
                         checked={useranswer.user_answer === '3'} disabled />
                  <label className="form-check-label">
                    {useranswer.option3}
                  </label>
                </div>
                {useranswer.user_answer === useranswer.answer ? (
                  '✔ Answer correctly'
                ) : (
                  `❌ Correct answer: ${useranswer.answer}`
                )}
              </div>
            </div>
            <div className="col-md-5">
              <img className="bd-placeholder-img card-img-top m-auto"
                   src={`/${useranswer.image_url}`} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
