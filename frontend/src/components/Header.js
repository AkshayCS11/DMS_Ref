import React, { useState } from "react";
import {Box, Tab, Tabs} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import '../components/Header.css';
import $ from 'jquery';
axios.defaults.withCredentials = true;

$( "signuptab" ).click().removeClass( "tab" );

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();

  return (
    <div class="navbar-header">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF60XgtzuS54ne532da6N-qMESuDY-sWPwGw&usqp=CAU" alt="logo" />
        <h1 className="navbar-title">DATA MANAGEMENT</h1>
          <Box sx={{ margin: "auto" }}>
            <Tabs sx={{ margin: "0px 480px 20px 0px" }}
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab placeholder="Log In" className="logintab" to="/login" LinkComponent={Link} label="Login"/>
                  <Tab placeholder="Sign Up"  className="signuptab" to="/signup" LinkComponent={Link} label="Signup"/>
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}{" "}
            </Tabs>
          </Box>
        <img className="avatar" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" alt="Profile Pic" />
    </div>
  );
};

export default Header;