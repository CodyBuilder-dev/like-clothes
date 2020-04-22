import React, { useState } from "react";
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
    <div className="loginBox"  style={{marginBottom: '70px', transform: 'translate(-50%, 10%)'}}>
      <h1>로그인</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
      
			<form onSubmit={onSubmit} method="POST">
				<div>
        <TextField
          type='text' name="email" label='E-mail' value={user.email} fullWidth='true'
          onChange={onChange} errorText={errors.email}
        /></div>
        <div>
				<TextField
          type="password" name="password" label='Password' value={user.password} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        /></div>

        <Button variant='outlined' type="submit" style={{marginTop: '20px'}} color='primary'
          disabled={btnState}
        >로그인</Button>
      </form>

      <p style={{marginTop: '10px'}}>
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default SignInForm;
