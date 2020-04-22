import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import SignUpForm from "./SignUpForm";

const axios = require("axios");
const validateSignUpForm = require("./validate").validateSignUpForm;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: "",
        password: "",
        name: "",
        nickname: "",
        address: "",
        phone: "",
        birth: null,
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

  // changeAddr = (addr) => {
  //   this.setState({
  //     ...this.state,
  //     user: {
  //       ...this.state.user,
  //       address: addr,
  //     }
  //   });
  // }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitSignup(params) {
    axios
      .post("http://i02a401.p.ssafy.io:8000/user/signup/", params)
      .then(res => {
        console.log(res)
        if (res.data.state === 'success') {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          // window.location.href = '/';
          console.log('회원가입 성공!')
          alert('회원가입 성공!')
          this.setState({isSuccess:true});
        } else {
          this.setState({
            errors: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        console.log("Sign up data submit error: ", err);
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
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  render() {
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
        {this.state.isSuccess && <Redirect to='signin'></Redirect>}
      </div>
    );
  }
}

export default SignUp;
