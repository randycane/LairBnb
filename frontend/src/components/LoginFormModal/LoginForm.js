import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import DemoUserComponent from "./DemoUser";

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
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </ul>
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
      <button type="submit">Log In</button>
      <button onClick={demoLogin} className="demo-user">Demo User</button>
    </form>
  );
}

export default LoginForm;
