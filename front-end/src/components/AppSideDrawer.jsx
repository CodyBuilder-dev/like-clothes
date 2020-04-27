import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Button, Card, CardContent } from '@material-ui/core'
import { Lock, PersonAdd, ExitToApp, HomeOutlined, FaceOutlined, LocalMallOutlined, StoreOutlined } from '@material-ui/icons';
import ScrollToTopButton from '../components/ScrollToTopButton'
import { appsidedrawerjsx } from '../css/useStyles'

const Logo = require('./Logo3.png')

export default function SearchAppBar(props) {
  const styles = appsidedrawerjsx();
  const user = props.authentication.isAuthenticated;

  const handleLogOut = () => {
    props.setAuthentication(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    localStorage.removeItem('isAuthenticated');
    // props.history.replace('/');

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
                <img src={Logo} style={{ width: '100%', opacity: 1 }} />
              </NavLink>
            </Card>
          </List>

          <Divider />
          <Divider />
          <div className={styles.drawer}>
            {user === true ?
              <Card variant="outlined" className={styles.cardContent1}>
                <CardContent>
                  {/* 로그인 상태 정보가 들어갈 부분이에요 */}
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
          <List className={styles.drawer}>
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to='/'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><HomeOutlined /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </NavLink>
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to='/mypage'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><FaceOutlined /></ListItemIcon>
                <ListItemText primary='My Page' />
              </ListItem>
            </NavLink>
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to='/recommend'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><LocalMallOutlined /></ListItemIcon>
                <ListItemText primary='추천해욧' />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <Divider />

          {user === true &&
            <Button variant="contained" size="medium" color="secondary"
            className={styles.buttonLogout}
            style={{ width: 'calc(100% - 16px)', marginBottom: 5, marginLeft: 8, marginRight: 8 }}
            display="flex" onClick={() => handleLogOut()}>
              <ExitToApp style={{ marginRight: 20 }} />
              Log Out
            </Button>
          }
        </div>
      </Drawer>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}
