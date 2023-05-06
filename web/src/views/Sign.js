import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Review from '../components/Review';

const Sign = () => {
  const { sign_id } = useParams();
  const [sign, setSign] = useState([]);
  const reviewInp = useRef();

  useEffect(() => {
    fetch(`/api/sign/${sign_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: 'Hello world!',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSign(data.data);
      });
  }, [sign_id]);

  const reviewHandler = () => {
    const review = reviewInp.current.value;
    if (review) {
      fetch(`/api/review/${sign_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          const item = {
            comment_text: review,
            created_at: new Date(),
            review_id: Date.now(),
          };
          setSign((prevState) => ({
            ...prevState,
            reviews: [...prevState.reviews, item],
          }));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const shareHandler = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then((res) => alert('Share success!'))
      .catch((res) => alert('Share Fail'));
  };

  return (
    <div className="bg-white">
      <div className="container marketing">
        <div className="row featurette">
          <div className="col-md-7 align-self-center p-lg-5">
            <h2
              className="featurette-heading lh-1 fw-bolder"
              style={{ fontSize: '30px' }}
            >
              {sign.name}
            </h2>
            <p className="lead" style={{ fontSize: '20px' }}>
              {sign.description}
            </p>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary border"
              onClick={shareHandler}
            >
              Share
            </button>
          </div>
          <div className="col-md-5">
            <img
              className="bd-placeholder-img card-img-top m-auto"
              src={'/' + sign.image_url}
              alt=""
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="card shadow-sm rounded-3">
          <div className="mx-5 my-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Comment:
            </label>
            <textarea className="form-control" rows="4" ref={reviewInp}></textarea>
            <button
              type="button"
              className="btn btn-outline-primary mt-3 float-end"
              onClick={reviewHandler}
            >
              Review
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <Review reviews={sign.reviews} />
        </div>
      </div>
    </div>
  );
};

export default Sign;
