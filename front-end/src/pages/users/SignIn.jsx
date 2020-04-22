import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import SignInForm from "./SignInForm";

const axios = require("axios");
const FormValidators = require("./validate");
const validateLoginForm = FormValidators.validateLoginForm;
const validateOnChangeForm = FormValidators.validateOnChangeForm;


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
      this.validateForm = this.validateForm.bind(this);
    }
  
    handleChange(event) {
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value;
  
      event.preventDefault();
      var payload = validateOnChangeForm(this.state.user);
      console.log(payload.btnState)
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
  
    submitLogin(params) {
      // var params = { email: user.email, password: user.pw };
      axios
        .post("http://i02a401.p.ssafy.io:8000/user/signin/", params)
        .then(res => {
					console.log(res)
          if (res.data.state === 'success') {
            localStorage.token = res.data.accessToken;
            localStorage.isAuthenticated = true;
            // window.location.reload();
            // window.location.href = "/";
            console.log('로그인 성공!')
          } else {
            this.setState({
              errors: { message: res.data.message }
            });
          }
        })
        .catch(err => {
          alert('로그인에 실패하였습니다.');
          console.log("Log in data submit error: ", err);
          console.log("Log in data submit error: ", this.state.message);
        });
    }
  
    validateForm(event) {
      event.preventDefault();
      var payload = validateLoginForm(this.state.user);
      if (payload.success) {
        this.setState({
          errors: {}
        });
        var user = {
          email: this.state.user.email,
          password: this.state.user.password,
        };
        this.submitLogin(user);
      } else {
        const errors = payload.errors;
        // 실패 시 비번 지울 때 쓸것
        // const pwclear = this.state.user.password;
        // console.log(pwclear)
        this.setState({
          errors,
        });
      }
    }
  
    render() {
      return (
        <div>
					<Zoom in={true}>
						<SignInForm
							onSubmit={this.validateForm}
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
  