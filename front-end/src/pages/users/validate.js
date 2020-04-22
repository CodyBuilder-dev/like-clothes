const validator = require("validator");

const validateSignUpForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.nickname !== "string" ||
    payload.nickname.trim().length === 0
  ) {
    isFormValid = false;
    errors.nickname = "Please provide a user name.";
  }

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    !/^[a-zA-Z0-9]{8,}$/.test(payload.password.trim())
  ) {
    isFormValid = false;
    errors.password = "비밀번호는 영문/숫자 혼용 8자 이상 설정해야 합니다.";
  }

  var checkNumber = payload.password.trim().search(/[0-9]/g);
  var checkEnglish = payload.password.trim().search(/[a-z]/ig);

  if(checkNumber <0 || checkEnglish <0){

    errors.password = "비밀번호는 영문/숫자 혼용 8자 이상 설정해야 합니다.";

    isFormValid = false;

  }

  // if (!payload || payload.pwconfirm !== payload.password) {
  //   isFormValid = false;
  //   errors.pwconfirm = "Password confirmation doesn't match.";
  // }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

const validateOnChangeForm = payload => {
  // let onChangeValid = false;
  if (
    typeof payload.email === "string" &&
    validator.isEmail(payload.email) &&
    // typeof payload.password === "string" &&
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
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
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
