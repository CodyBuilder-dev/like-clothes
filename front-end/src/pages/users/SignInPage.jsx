import React, { Component } from "react";
import { Card, Box, Zoom } from '@material-ui/core';
import SignInForm from "./SignInForm";
import validate from "../../module/validate";

const SigninBackground = '/assets/SigninBackground.jpg'
const baseUrl = process.env.REACT_APP_URL

const axios = require("axios");
const validateSignInForm = validate.validateSignInForm;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: "",
        password: "",
      },
      btnState: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    event.preventDefault();
    var payload = validateSignInForm(this.state.user);
    if (payload.btnState) {
      this.setState({
        btnState: false,
      })
    } else {
      this.setState({
        btnState: true,
      })
    }

    this.setState({
      user
    });
  }

  submitLogin(event) {
    event.preventDefault();
    var params = {
      email: this.state.user.email,
      password: this.state.user.password,
    };
    axios
      .post(baseUrl + "/user/signin/", params)
      .then(res => {
        if (res.data.state === 'success') {
          localStorage.token = res.data.user.accessToken;
          localStorage.email = res.data.user.email;
          localStorage.nickname = res.data.user.nickname;
          localStorage.isAuthenticated = true;

          // 로그인을 갱신하기 위한 redux 소스 추가
          this.props.setAuthentication(true);

          window.location.href = "/";
        } else {
          alert('이메일과 비밀번호를 확인해 주세요')
        }
      })
  }

  render() {
    return (
      <Card style={{ width: "100%", height: 'calc(100vh - 112px)', backgroundColor: "rgba(0, 0, 0, 0)" }}>
        <Box display="flex" flexDirection="row">
          <Box>
            <Zoom in={true}>
              <SignInForm
                onSubmit={this.submitLogin}
                onChange={this.handleChange}
                errors={this.state.errors}
                user={this.state.user}
                btnState={this.state.btnState}
                style={{ height: '100%' }}
              />
            </Zoom>
          </Box>
          <Box style={{ overflow: 'hidden', height: '100%' }}>
            <img style={{
              width: 'auto',
              zIndex: 0,
              position: 'relative',
              right: '25%',
              bottom: 50,
            }} src={SigninBackground}></img>
          </Box>
        </Box>
      </Card>
    );
  }
}

export default SignIn;
