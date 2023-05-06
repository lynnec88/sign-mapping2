import React from 'react';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import "./assets/css/styles.css"
import Category from "./views/Category";
import Sign from "./views/Sign";
import Quizzes from "./views/Quizzes";
import Quiz from "./views/Quiz";
import Scores from "./views/Scores";
import Answers from "./views/Answers";
import About from "./views/About";
import Regional from "./views/Regional";

const App = () => {
    return (
        <div className={"box"}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/category"} element={<Category/>}/>
                <Route path={"/sign/:sign_id"} element={<Sign/>}/>
                <Route path={"/quizzes"} element={<Quizzes/>}/>
                <Route path={"/quiz/:quiz_id"} element={<Quiz/>}/>
                <Route path={"/scores"} element={<Scores/>}/>
                <Route path={"/answer/:userquiz_id"} element={<Answers/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/regional/"} element={<Regional/>}/>
                <Route path={"/regional/:common_id"} element={<Regional/>}/>
            </Routes>
        </div>
    );
};

export default App;
