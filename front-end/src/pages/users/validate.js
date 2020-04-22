const validator = require("validator");

const validateSignUpForm = payload => {
  let errors = [];
  var checkNumber = payload.password.trim().search(/[0-9]/g);
  var checkEnglish = payload.password.trim().search(/[a-z]/ig);

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    errors = "정확한 이메일 형식을 입력해주세요.";
  }

  else if (
    !payload ||
    typeof payload.password !== "string" ||
    !/^[a-zA-Z0-9]{8,}$/.test(payload.password.trim())
  ) {
    errors = "비밀번호 양식을 확인해 주세요.";
  }

  else if (checkNumber <0 || checkEnglish <0) {
    errors = "비밀번호 양식을 확인해 주세요.";
  }
  
  else if (
    !payload ||
    typeof payload.nickname !== "string" ||
    payload.nickname.trim().length === 0
  ) {
    errors = "닉네임을 입력해 주세요.";
  }

  return {
    errors
  };
};

const validateOnChangeForm = payload => {
  // let onChangeValid = false;
  if (
    typeof payload.email === "string" &&
    validator.isEmail(payload.email) &&
    payload.password.trim().length >= 8 &&
    payload.email && payload.password
  ) {
    return {
      btnState: true,
    };
  } else {
    return {
      btnState: false,
    };
  }
}


const validateLoginForm = payload => {
  let errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors = "Please provide your password.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors = "Password must have at least 8 characters.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

module.exports = {
  validateLoginForm: validateLoginForm,
  validateSignUpForm: validateSignUpForm,
  validateOnChangeForm: validateOnChangeForm
};
