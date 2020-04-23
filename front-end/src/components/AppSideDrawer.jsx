import React from 'react';
import { NavLink } from 'react-router-dom'
// import { Link as RouterLink } from 'react-router-dom'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Lock, PersonAdd, ExitToApp, HomeOutlined, FaceOutlined, LocalMallOutlined, StoreOutlined } from '@material-ui/icons';

const drawerWidth = 240;
const Logo = require('./Logo3.png')
const Background = require('./Background.jpg')

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: `${drawerWidth}px`,
    flexShrink: 0,
    textAlign: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  backImage: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  content: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    padding: theme.spacing(0),
  },
  cardContent1: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  cardContent2: {
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  button: {
    width: '100%',
    height: '45px',
    fontSize: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    opacity: 0.9
  },
  buttonLogout: {
    position: 'absolute',
    bottom: theme.spacing(2),
    height: '40px',
    fontSize: '15px',
    opacity: 0.85
  },
  listContent: {
    width: '100%',
    height: '45px',
    fontSize: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    opacity: 0.9
  }
}));

export default function SearchAppBar() {
  const styles = useStyles();
  const user = localStorage.isAuthenticated;

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
                  <Button variant="contained" size="medium" color="primary" className={styles.button} style={{ marginBottom: 5 }}>
                    <Lock style={{ marginRight: 20 }} />
                  Sign In
                </Button>
                  <Button variant="contained" size="medium" color="primary" className={styles.button}>
                    <PersonAdd style={{ marginRight: 20 }} />
                  Sign Up
                </Button>
                </CardContent>
              </Card>}
          </div>
          <Divider />
          <Divider />
          <List className={styles.drawer}>
            <NavLink
              activeStyle={{ color: 'black', textDecoration: 'none' }}
              to='/'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><HomeOutlined /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </NavLink>
            <NavLink
              activeStyle={{ color: 'black', textDecoration: 'none' }}
              to='/mypage'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><FaceOutlined /></ListItemIcon>
                <ListItemText primary='My Page' />
              </ListItem>
            </NavLink>
            <NavLink
              activeStyle={{ color: 'black', textDecoration: 'none' }}
              to='/recommend'>
              <ListItem button className={styles.listContent}>
                <ListItemIcon><LocalMallOutlined /></ListItemIcon>
                <ListItemText primary='추천해욧' />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <Divider />

          {user === undefined &&
            <Button variant="contained" size="medium" color="secondary" className={styles.buttonLogout} style={{ width: 'calc(100% - 16px)', marginBottom: 5, marginLeft: 8, marginRight: 8 }}
              display="flex"
              alignItems="flex-end">
              <ExitToApp style={{ marginRight: 20 }} />
              Log Out
            </Button>
          }
        </div>
      </Drawer>
    </div>
  );
}
