import React, {useRef} from 'react';
import {Link} from "react-router-dom";


    const Login = () => {
        const userInp = useRef();
        const pwdInp = useRef();
    
        const submitHandler = (e) => {
            e.preventDefault();
            const username = userInp.current.value;
            const password = pwdInp.current.value;
    
            fetch('/api/login', {
                method: 'POST',
                
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:username,
                    password:password
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.status) {
                    localStorage.setItem('email', username);
                    window.location.href = '/category';
                }
            })
            .catch(error => {
                alert('Login failed');
                console.error(error);
            });
        };
    return (
        <div className="modal modal-signin position-static py-3" style={{display: "block", overflowY: "hidden", height: '90%'}}>
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Log in</h1>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <form onSubmit={submitHandler}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" placeholder="name@example.com" ref={userInp}/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-3" placeholder="Password" ref={pwdInp}/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
                            <small className="text-muted">By clicking Login, you agree to the terms of use.</small>
                            <hr className="my-4"/>
                                <h2 className="fs-5 fw-bold mb-3">You don't have an account yet?</h2>
                                <Link className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" to={"/register"}>
                                    Join us now
                                </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
