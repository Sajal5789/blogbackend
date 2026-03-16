import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgba(0 0 0 /0.6);

  // display: flex;
  //flex-direction: column;
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  > p {
    margin-top: 20px;
  }
`;

const Loginbutton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 48px;
`;

const Signupbutton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #287450;
  height: 48px;
  border-radius: 48px;
  box-shadow: -0 2px 4px 0 rgba(0 0 0/20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const logininitialvalues = {
  username: "",
  password: "",
};

const signupinitialvalues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    
  const navigate = useNavigate();

  const [signup, setsignup] = useState(signupinitialvalues);
  const [error, setError] = useState("kuch nahi hua");

  const [login, setlogin] = useState(logininitialvalues);
  const [account, toggleAccount] = useState("login");

  const { setAccount } = useContext(DataContext);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onValueChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setsignup(signupinitialvalues);
      toggleAccount("login");
    } else {
      setError("Something went wrong! please try again later");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    console.log(response);
    if (response.issuccess) {
      setError("");
      // Store tokens in localStorage
      //localStorage.setItem('accessToken', response.data.accessToken);
      //localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      localStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      //<Navigate replace to ='/'/>
      navigate("/");
    }
     else {
      setError("something went wrong please try again later ");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />

        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => {
                onValueChange(e);
              }}
              name="username"
              label="enter username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => {
                onValueChange(e);
              }}
              name="password"
              label="enter password"
            />

            <Loginbutton
              variant="contained"
              onClick={() => {
                loginUser();
              }}
            >
              Login
            </Loginbutton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Signupbutton onClick={() => toggleSignup()}>
              create an ACCOUNT
            </Signupbutton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="name"
            />
            <TextField
              variant="standard"
              onChange={(e) => {
                onInputChange(e);
              }}
              name="username"
              label="enter username"
            />
            <TextField
              variant="standard"
              onChange={(e) => {
                onInputChange(e);
              }}
              name="password"
              label="enter password"
            />

            <Loginbutton variant="contained" onClick={() => signupUser()}>
              SIGNUP
            </Loginbutton>
            <Text style={{ textAlign: "center" }}>OR</Text>

            <Signupbutton onClick={() => toggleSignup()}>
              ALREADY HAVE an ACCOUNT
            </Signupbutton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
