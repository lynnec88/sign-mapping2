import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <main>
            <div className="left">
                <div className="star"><span role="img" aria-label="star rating">⭐⭐⭐⭐⭐</span></div>
                <h1 className="title">Discover the Joy <br/>of Signing: Learn<br/>ASL the Fun<br/>Way!</h1>
                <div className="join">
                    <Link to={"/register"}><button>Join Today</button></Link>
                </div>
            </div>
            <div className="right"></div>
        </main>
    );
};

export default Home;
