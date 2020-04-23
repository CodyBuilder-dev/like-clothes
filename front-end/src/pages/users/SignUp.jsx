import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import SignUpForm from "./SignUpForm";

const baseUrl = process.env.REACT_APP_URL

const axios = require("axios");
const validateSignUpForm = require("./validate").validateSignUpForm;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      user: {
        email: "",
        password: "",
        name: "",
        nickname: "",
        address: "",
        phone: "",
        birth: "",
        gender: "",
        description: ""
      },
      isSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  handleAddress(data) {
    // 지번주소와 도로명주소 매칭
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    const user = this.state.user;
    user["address"] = fullAddress;
    this.setState({
      ...this.state,
      user
    });
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitSignup(params) {
    console.log(baseUrl, 'url')
    axios
      .post(baseUrl + "/user/signup/", params)
      .then(res => {
        if (res.data.state === 'success') {
          alert('받았니?')
          localStorage.token = res.data.user.accessToken;
          localStorage.isAuthenticated = true;
          console.log('회원가입 성공!')
          this.setState({isSuccess:true});
        } else {
          alert('회원가입 실패')
          window.location.href = '/signup'
          this.setState({
            isSuccess: false
          });
        }
      })
      .catch(err => {
        console.log("Server Error: ", err);
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        email: this.state.user.email,
        password: this.state.user.password,
        name: this.state.user.name,
        nickname: this.state.user.nickname,
        address: this.state.user.address,
        phone_num: this.state.user.phone,
        age: this.state.user.birth,
        gender: this.state.user.gender,
        description: ''
      };
      this.submitSignup(user);
    } else {
      const error = payload.errors;
      this.setState({
        errors: error
      });
    }
  }

  render() {
    console.log(this.state.user, 'user')
    return (
      <div>
        <Zoom in={true}>
          <SignUpForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            onAddrChange={this.handleAddress}
            errors={this.state.errors}
            user={this.state.user}
            isSuccess={this.state.isSuccess}
          />
        </Zoom>
        {this.state.isSuccess && <Link to='signin'></Link>}
      </div>
    );
  }
}

export default SignUp;
