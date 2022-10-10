import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function eve() {
    document.getElementById('container').hidden = true;
  }

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err.response));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => history("/user"));
  };
  return (
    <div id="container">
      <form onSubmit={handleSubmit}>
      <button className="btn-close" onClick={eve} >X</button>
          <h1>Log In</h1>
          <input name="email" onChange={handleChange} type="email"nvalue={inputs.email} placeholder="Enter your Email" required/>
          <input name="password" onChange={handleChange} type="password" value={inputs.password} placeholder="Enter your Password" required/>
          <input type="submit" placeholder="Log In" />
      </form>
    </div>
  );
};

export default Login;