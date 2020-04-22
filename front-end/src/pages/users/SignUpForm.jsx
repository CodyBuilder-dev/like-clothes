import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, Popover } from '@material-ui/core';
import DaumPostcode from 'react-daum-postcode';
import "../../css/style.css";

const SignUpForm = ({
  onSubmit,
  onChange,
  onAddrChange,
  errors,
  user,
}) => {
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
    <div className="loginBox" style={{marginBottom: '70px', transform: 'translate(-50%, 10%)'}}>
      <h1>회원가입</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <div style={{width: '76%', marginLeft: '13%'}}><form onSubmit={onSubmit}>
        <div style={{marginTop: '20px'}}><TextField
          type='text' name='email' label='E-mail' value={user.email} fullWidth='true'
          onChange={onChange} errorText={errors.email}
        /></div>
        <div style={{marginTop: '2px'}}><TextField
          type='password' name='password' label='Password' value={user.password} fullWidth='true'
          onChange={onChange} errorText={errors.password}
        /></div>
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
          style={{marginTop: '12px', marginLeft: '4%'}}>
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

        <div style={{marginTop: '2px'}}><TextField
          type='number' name='birth' label='Age' value={user.birth} fullWidth='true'
          onChange={onChange}
        /></div>
        {/* <div style={{marginTop: '20px'}}>
        <FormLabel component='legend'>birth</FormLabel>
        <TextField
          type='date' name='birth' value={user.birth} fullWidth='true'
          onChange={onChange} errorText={errors.birth}
        /></div> */}

        <div style={{marginTop: '20px'}}>
          <FormLabel component='legend'>gender</FormLabel>
          <RadioGroup aria-label='gender' style={{display: 'block'}}>
            <FormControlLabel value="0" control={<Radio />} label="male" name='gender' onChange={onChange} />
            <FormControlLabel value="1" control={<Radio />} label="female" name='gender' onChange={onChange} />
            <FormControlLabel value="2" control={<Radio />} label="other" name='gender' onChange={onChange} />
          </RadioGroup>
        </div>

        <Button variant="outlined" type="submit" style={{marginTop: '20px'}} color='primary'
        >가입</Button>
      </form></div>

      <p style={{marginTop: '10px'}}>
        이미 계정이 있나요? <Link to="/signin">로그인</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
