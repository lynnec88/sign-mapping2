import React, { useRef } from 'react';
import '../assets/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const userInp = useRef();
  const pwdInp = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const username = userInp.current.value;
    const password = pwdInp.current.value;

    fetch('/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `username=${username}&password=${password}`,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((res) => {
        alert(res.message);
        navigate('/login');
      })
      .catch((error) => {}
        alert('Registration failed, the mailbox is already registered');
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="container col-xxl-10 py-5" style={{ height: '90%' }}>
      <div className="row align-items-center h-100">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
          <p className="col-lg-10 fs-4">
            Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a
            validation state that can be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" placeholder="name@example.com" ref={userInp} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" placeholder="Password" ref={pwdInp} />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary mt-3"
              style={{ height: '50px' }}
              type="submit"
            >
              Sign up
            </button>
            <hr className="my-4" />
            <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
