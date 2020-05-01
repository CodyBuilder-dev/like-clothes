import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Card, Box, Zoom } from '@material-ui/core';
import SignUpForm from "./SignUpForm";
import validate from "../../module/validate";


const SignupBackground = '/assets/SignupBackground.jpg'
const baseUrl = process.env.REACT_APP_URL

const axios = require("axios");
const validateSignUpForm = validate.validateSignUpForm;

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
        profile_img: ""
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
    const user = this.state.user;
    user["profile_img"] = file[0];
    this.setState({
      ...this.state,
      user
    })
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

    axios.post(baseUrl + "/user/signup/", formData)
    .then(res => {
      console.log(res)
      if (res.data.state === 'success') {
        console.log(res.data, '결과데이터')
        localStorage.token = res.data.user.accessToken;
        localStorage.isAuthenticated = true;
        localStorage.email = res.data.user.email;
        localStorage.nickname = res.data.user.nickname;
      } else if (res.data.err === "User email already exist") {
        alert('이메일 중복입니다')
      } else {
        alert(res.data)
        // this.setState({
        //   isSuccess: false
        // });
      }
    })
    .then(() => {
      this.props.setAuthentication(true);
      this.setState({isSuccess:true});
    });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: []
      });
      this.submitSignup(this.state.user);
    } else {
      const error = payload.errors;
      this.setState({
        errors: error
      });
    }
  }

  render() {
    return (
      <Zoom in={true}>
      <Card align="center" style={{ width: "100%", height: 'calc(100vh)', backgroundColor: "rgba(0, 0, 0, 0)" }}>
        <Box display="flex" flexDirection="row">
          <Box>
              <SignUpForm
                onSubmit={this.validateForm}
                onChange={this.handleChange}
                onAddrChange={this.handleAddress}
                onImgChange={this.handleImg}
                errors={this.state.errors}
                user={this.state.user}
              />
            {this.state.isSuccess && <Redirect to='/choicestyle'></Redirect>}
          </Box>
          <Box style={{ overflow: 'hidden', height: '100%' }}>
            <img alt="" style={{
              width: 'auto',
              zIndex: 0,
              position: 'relative',
              right: 100,
              bottom : 100
            }} src={SignupBackground}></img>
          </Box>
        </Box>
      </Card >
      </Zoom>
    );
  }
}

export default SignUp;
