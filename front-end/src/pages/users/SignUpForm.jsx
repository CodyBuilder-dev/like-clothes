import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, RadioGroup, Radio, Popover,
  FormControlLabel, FormLabel, FormHelperText } from '@material-ui/core';
import DaumPostcode from 'react-daum-postcode';
import { makeStyles } from '@material-ui/core/styles'

const boxStyle = makeStyles({
  root: {
    width: '320px', 
    textAlign: 'center',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 10%)',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.4)',
    marginBottom: '70px',
  },
});

const SignUpForm = ({
  onSubmit,
  onChange,
  onAddrChange,
  onImgChange,
  errors,
  user,
}) => {
  const classes = boxStyle();

  // Address Popover
  const [ addrChange, setaddrChange ] = useState('');
  const [ anchorEl, setAnchorEl ] = useState(null);

  const endAddrChange = (e) => {
    setaddrChange(e.address);
    onAddrChange(e);
  }

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = addrChange ? false : (Boolean(anchorEl)===true ? true : false);

  return (
    <div className={classes.root}>
      <h1>회원가입</h1>

      <div style={{width: '96%', marginLeft: '2%'}}><form onSubmit={onSubmit} encType='multipart/form-data'>
        
        <div style={{marginTop: '20px'}}>
          <input type='file' name='profile_img' onChange={onImgChange}></input>
        </div>
        <div style={{marginTop: '2px'}}><TextField
          type='text' name='email' label='E-mail' value={user.email} fullWidth='true'
          onChange={onChange} errorText={errors.email}
        /></div>
        <div style={{marginTop: '2px'}}><TextField
          type='password' name='password' label='Password' value={user.password} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        />
        <FormHelperText>영문/숫자 혼합 8자 이상</FormHelperText>
        </div>
        <div style={{marginTop: '2px'}}><TextField
          type='text' name='name' label='Name' value={user.name} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        /></div>
        <div style={{marginTop: '2px'}}><TextField
          type='text' name='nickname' label='Nickname' value={user.nickname} fullWidth='true'
          onChange={onChange} errorText={errors.nickname}
        /></div>

        <div style={{marginTop: '2px'}}>
        <TextField
          name='address' label='Address' value={addrChange}
          onChange={onChange} errorText={errors.address} 
        />
        <Button variant="outlined" onClick={handleClick} 
          style={{marginTop: '12px', marginLeft: '2%'}}>
          주소 검색
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        ><DaumPostcode onComplete={endAddrChange} />
        </Popover>
        </div>
        
        <div style={{marginTop: '2px'}}><TextField
          type='text' name='phone' label='Phone Number' value={user.phone} fullWidth='true'
          onChange={onChange} errorText={errors.phone}
        /></div>

        <div style={{marginTop: '20px'}}>
        <FormLabel component='legend'>birth</FormLabel>
        <TextField
          type='date' name='birth' value={user.birth} fullWidth='true'
          onChange={onChange} errorText={errors.birth}
        /></div>

        <div style={{marginTop: '20px'}}>
          <FormLabel component='legend'>gender</FormLabel>
          <RadioGroup aria-label='gender' style={{display: 'block'}}>
            <FormControlLabel value="M" control={<Radio />} label="Male" name='gender' onChange={onChange} />
            <FormControlLabel value="F" control={<Radio />} label="Female" name='gender' onChange={onChange} />
          </RadioGroup>
        </div>

        <div style={{marginTop: '20px'}}>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <Button variant="outlined" type="submit" color='primary'
        >가입</Button>
        </div>
      </form></div>

      <p style={{marginTop: '10px'}}>
        이미 계정이 있나요? <Link to="/signin">로그인</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
