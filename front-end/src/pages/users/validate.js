const validator = require("validator");

const validateSignUpForm = payload => {
  let errors = [];
  let isFormValid = true;
  var checkNumber = payload.password.trim().search(/[0-9]/g);
  var checkEnglish = payload.password.trim().search(/[a-z]/ig);

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors = "정확한 이메일 형식을 입력해주세요.";
  }
  
  else if ( !payload.password ) {
    isFormValid = false;
    errors = "비밀번호를 입력해주세요."
  }

  else if (
    typeof payload.password !== "string" ||
    !/^[a-zA-Z0-9]{8,}$/.test(payload.password.trim()) ||
    checkNumber <0 || checkEnglish <0
  ) {
    isFormValid = false;
    errors = "비밀번호 양식을 확인해 주세요.";
  }
  
  else if (
    !payload ||
    typeof payload.nickname !== "string" ||
    payload.nickname.trim().length === 0
  ) {
    isFormValid = false;
    errors = "닉네임을 입력해 주세요.";
  }

  else if ( !payload.birth ) {
    isFormValid = false;
    errors = '생년월일을 입력해 주세요.'
  }

  else if ( !payload.gender ) {
    isFormValid = false;
    errors = '성별을 선택해 주세요.'
  }

  else if ( !isFormValid ) {
    errors = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    errors
  };
};

const validateSignInForm = payload => {
  if (
    typeof payload.email === "string" &&
    validator.isEmail(payload.email) &&
    payload.password.trim().length >= 8 &&
    payload.email && payload.password
  ) { 
    return {
      btnState: true,
    }
  } else {
    return {
      btnState: false,
    }
  }
}

module.exports = {
  validateSignUpForm: validateSignUpForm,
  validateSignInForm: validateSignInForm
};
