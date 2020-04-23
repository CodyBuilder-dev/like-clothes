import React from "react";
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import "../../css/style.css";

const SignInForm = ({ 
  onSubmit,
  onChange,
  errors,
  user,
  btnState
}) => {
  return (
    <div className="loginBox">
      <h1>로그인</h1>
      
			<div style={{width: '76%', marginLeft: '13%'}}><form onSubmit={onSubmit} method="POST">
				<div style={{marginTop: '20px'}}>
        <TextField
          type='text' name="email" label='E-mail' value={user.email} fullWidth='true'
          onChange={onChange} errorText={errors.email}
        /></div>
        <div style={{marginTop: '2px'}}>
				<TextField
          type="password" name="password" label='Password' value={user.password} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        /></div>

        <div style={{marginTop: '20px'}}>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <Button variant='outlined' type="submit" color='primary' disabled={btnState}
        >로그인</Button>
        </div>
      </form></div>

      <p style={{marginTop: '10px'}}>
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default SignInForm;
