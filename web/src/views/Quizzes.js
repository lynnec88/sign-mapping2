import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Quizzes = () => {
    const [quizzes,setQuizzes] = useState([])
    useEffect(()=>{
        axios.post("/api/quizzes").then(res=>{
            setQuizzes(res.data.data)
        })
    },[])
    return (
      <div className="list-group w-auto" style={{minHeight:'90%', margin: '50px auto 0 auto',padding:'50px 100px 0 100px', backgroundColor: 'white'}}>
            {quizzes.map(quiz=>
                <Link to={"/quiz/"+quiz.quiz_id} className="list-group-item list-group-item-action d-flex gap-3 py-3">
                    <img src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/96/iconmonstr-pencil-text-lined.png"
                         width="48" height="48" className="rounded-circle flex-shrink-0" alt=''/>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <h2 className="mb-0">{quiz.quizname}</h2>
                    </div>
                </Link>
            )}

        </div>
    );
};

export default Quizzes;
