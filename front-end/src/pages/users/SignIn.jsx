import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import SignInForm from "./SignInForm";

const baseUrl = process.env.REACT_APP_URL

const axios = require("axios");
const validateSignInForm = require("./validate").validateSignInForm;

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
						localStorage.isAuthenticated = true;
            window.location.href = "/";
          } else {
						alert('이메일과 비밀번호를 확인해 주세요')
          }
        })
    }
  
    render() {
      return (
        <div>
					<Zoom in={true}>
						<SignInForm
							onSubmit={this.submitLogin}
							onChange={this.handleChange}
							errors={this.state.errors}
							user={this.state.user}
							btnState={this.state.btnState}
						/>
					</Zoom>
        </div>
      );
    }
  }
  
  export default SignIn;
  