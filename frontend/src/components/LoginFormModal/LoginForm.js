import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: "shinichiro@user.io", password: "password1" }))
  }

  return (
    <div className="encompass-form">
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, idx) => (
          <div className="errors" key={idx}>{error}</div>
        ))}
      </div>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </label>
        <div className="get-on">
      <button className="user" type="submit">Log In</button>
        </div>
        <div className="get-on">
      <button onClick={demoLogin} className="user">Demo User</button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
