import React from "react";
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const boxStyle = makeStyles({
  root: {
    width: '320px', 
    textAlign: 'center',
    justify: 'center',
    position: 'relative',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.4)',
    height: '100%',
    overflow: 'hidden'
  },
});

const SignInForm = ({ 
  onSubmit,
  onChange,
  errors,
  user,
  btnState
}) => {
  const classes = boxStyle();
  return (
    <div className={classes.root}>
      <h1>로그인</h1>
      
			<div style={{width: '96%', marginLeft: '2%'}}><form onSubmit={onSubmit} method="POST">
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

        <div>
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
