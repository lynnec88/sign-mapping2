import React from 'react';
import moment from "moment";

const Review = (props) => {
    const reviews = props.reviews || []
    return (
        <>{reviews.map(review =>
            <div className="col-sm-6 col-lg-4 mb-4" key={review.review_id}>
                <div className="card p-3">
                    <figure className="p-3 mb-0">
                        <blockquote className="blockquote">
                            <p>{review.comment_text}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer mb-0 text-muted float-end mt-0">
                            {moment(new Date(review.created_at)).format('YYYY-MM-DD HH:mm:ss')}
                        </figcaption>
                    </figure>
                </div>
            </div>
        )}</>
    );
};

export default Review;
