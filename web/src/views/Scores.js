import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/api/scores', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setScores(data.data));
  }, []);

  return (
    <div style={{ minHeight: '90%', backgroundColor: 'white' }}>
      <div className="container">
        <h1 style={{ fontWeight: 'bolder' }}>Record：</h1>
        <div className="row mt-5">
          {scores.map((score) => (
            <Link
              className="col-sm-6 col-lg-4 mb-4"
              to={`/answer/${score.userquiz_id}`}
              key={score.userquiz_id}
            >
              <div className="card p-3">
                <figure className="p-3 mb-0">
                  <blockquote className="blockquote">
                    <h1 className="fst-italic">{score.score}%</h1>
                    <p>{score.quizname}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer mb-0 text-muted float-end mt-0">
                    {moment(new Date(score.time)).format('YYYY-MM-DD HH:mm:ss')}
                  </figcaption>
                </figure>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
