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
        profile_img : ""
      },
      isSuccess: false,
      fileState: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleImg = this.handleImg.bind(this);
  }

  handleImg(e) {
    let file = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(file[0])
    this.setState({
      ...this.state,
      fileState: file[0]
    })

    reader.onloadend = () => {
      const base64 = reader.result.toString();
      const user = this.state.user;
      user["profile_img"] = base64
      this.setState({
        ...this.state,
        user
      });
    }
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
    console.log(params, 'params')
    const formData = new FormData();
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('name', params.name);
    formData.append('nickname', params.nickname);
    formData.append('address', params.address);
    formData.append('phone_num', params.phone_num);
    formData.append('birth', params.birth);
    formData.append('gender', params.gender);
    formData.append('profile_img', params.profile_img);
    console.log(formData, 'formdata')

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post(baseUrl + "/user/signup/", params)
      .then(res => {
        if (res.data.state === 'success') {
          console.log(res)
          localStorage.token = res.data.user.accessToken;
          localStorage.isAuthenticated = true;
          // this.setState({isSuccess:true});
        } else if (res.data.err === "User email already exist") {
          alert('이메일 중복')
        } else {
          console.log(res)
          alert('회원가입 실패')
          // window.location.href = '/signup'
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
      this.submitSignup(this.state.user);
    } else {
      const error = payload.errors;
      console.log(error,'error')
      console.log(this.state.user, 'user')
      this.setState({
        errors: error
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
            onImgChange={this.handleImg}
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
