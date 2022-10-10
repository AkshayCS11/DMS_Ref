import React, { useState } from "react";
import './Signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then(() => history("/login"));
  };
  const headerStyle = { margin:0 }

  function close() {
    document.getElementById('container').hidden = true;
}
  return (
    <div id="container">
      <form onSubmit={handleSubmit}>
                    <button className="btn-close" onClick={close} >X</button>
                    <h1 style={headerStyle}>Sign Up</h1>
                    <h4> Please fill this form to create an account</h4>
                    <input name="name" value={inputs.name} onChange={handleChange} type="text" placeholder="Enter your name" required/>
                    <br/>
                    <input name="email" value={inputs.email} onChange={handleChange} type="email" placeholder="Enter your email" required/>
                    <br/>
                    <input id="phone" name="phone" value={inputs.phone} onChange={handleChange} type="number" placeholder="Enter your phone number" required/>
                    <br/>
                    <input name="password" value={inputs.password} onChange={handleChange} type="password" placeholder="Enter your password" required/>
                    <br/>
                    <input name="cnfrmpassword" value={inputs.cnfrmpassword} onChange={handleChange} type="password" placeholder="Confirm password" required/>

                    <FormControlLabel
                        control={<Checkbox name="checkedA" required/>}
                        label="I accept the terms and conditions."
                    />
                    <br/>
                    <input type='submit' placeholder="submit"/>
      </form>
    </div>
  );
};

export default Signup;