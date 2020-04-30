import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { NavLink, Redirect } from 'react-router-dom'
import { Avatar, Drawer, Divider, List, ListItem, ListItemIcon, Button, Card, CardContent } from '@material-ui/core'
import { Lock, PersonAdd, ExitToApp, FaceOutlined, LocalMallOutlined, StoreOutlined } from '@material-ui/icons';
import ScrollToTopButton from '../components/ScrollToTopButton'
import { appsidedrawerjsx } from '../css/useStyles'

const Logo = require('./Logo3.png')

export default function SearchAppBar(props) {
  const styles = appsidedrawerjsx();
  const user = props.authentication.isAuthenticated;
  const user_email = localStorage.email;
  const [userinfo, setUserinfo] = useState({});
  const [isLogOut, setIsLogOut] = useState(false);

  useEffect(() => {
    if (user) {
      const url = process.env.REACT_APP_URL + `/user/${user_email}`
      axios.get(url).then((res) => {
        setUserinfo(res.data.user);
      })
    }
  }, [user]);

  const movePage = () => {
    if (!!localStorage.isAuthenticated === false) {
      alert('로그인 해주세여 >_');
      // reload 말고 좋은 방법 없을까....
      window.location.reload();
    }
  }

  const handleLogOut = () => {
    props.setAuthentication(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    localStorage.removeItem('isAuthenticated');
    // window.location.reload();
    setIsLogOut(true);
  }

  return (
    <div className={styles.root}>
      <Drawer classes={{ paper: styles.backImage }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <Divider />
        <div className={styles.content}>
          <List className={styles.drawer}>
            <Card variant="outlined" className={styles.cardContent1}>
              <NavLink to='/'>
                <img alt="" src={Logo} style={{ width: '100%', opacity: 1 }} />
              </NavLink>
            </Card>
          </List>

          <Divider />
          <Divider />
          <div className={styles.drawer}>
            {user ?
              <Card variant="outlined" className={styles.cardContent1}>
                <CardContent>
                  <NavLink to={`/closet/?user_email=${user_email}`}>
                    <Avatar style={{ display: 'inline-block', width: 160, height: 160 }} src={userinfo.profile_img} />
                  </NavLink>
                  <p style={{ marginBottom: 5 }}>{userinfo.nickname}</p>
                  <p style={{ margin: 0, color: 'rgb(100, 100, 100)' }}>님 안녕하세요</p>
                </CardContent>
              </Card> :
              <Card variant="outlined" className={styles.cardContent2}>
                {/* <CardContent style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}> */}
                <CardContent style={{ padding: 0 }}>
                  <NavLink to='/signin'>
                    <Button variant="contained" size="medium" color="primary" className={styles.button} style={{ marginBottom: 5 }}>
                      <Lock style={{ marginRight: 20 }} />
                  Sign In
                </Button>
                  </NavLink>
                  <NavLink to='/signup'>
                    <Button variant="contained" size="medium" color="primary" className={styles.button}>
                      <PersonAdd style={{ marginRight: 20 }} />
                  Sign Up
                </Button>
                  </NavLink>
                </CardContent>
              </Card>}
          </div>
          <Divider />
          <Divider />

          {user === true &&
            <List className={styles.drawer}>
              <NavLink
                style={{ color: 'black', textDecoration: 'none' }}
                to={`/closet?user_email=${localStorage.email}`}>
                <ListItem button className={styles.listContent}>
                  <ListItemIcon><FaceOutlined /></ListItemIcon>
                  <p>내 옷장</p>
                </ListItem>
              </NavLink>
              <NavLink onClick={movePage}
                style={{ color: 'black', textDecoration: 'none' }}
                to='/clothessubscribe'>
                <ListItem button className={styles.listContent}>
                  <ListItemIcon><StoreOutlined /></ListItemIcon>
                  <p>구독해욧</p>
                </ListItem>
              </NavLink>
              <NavLink onClick={movePage}
                style={{ color: 'black', textDecoration: 'none' }}
                to='/clothesrecommend'>
                <ListItem button className={styles.listContent}>
                  <ListItemIcon><LocalMallOutlined /></ListItemIcon>
                  <p>추천해욧</p>
                </ListItem>
              </NavLink>
            </List>}
          <Divider />
          <Divider />

          {user === true &&
            <Button variant="contained" size="medium" color="secondary"
              className={styles.buttonLogout}
              style={{ width: 'calc(100% - 16px)', marginBottom: 5, marginLeft: 8, marginRight: 8 }}
              display="" onClick={() => handleLogOut()}>
              <ExitToApp style={{ marginRight: 20 }} />
              Log Out
            </Button>
          }
        </div>
      </Drawer>
      {isLogOut && <Redirect to='/'></Redirect>}
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}
