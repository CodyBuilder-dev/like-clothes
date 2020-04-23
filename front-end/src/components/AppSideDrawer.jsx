import React from 'react';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Button, Card, CardContent, requirePropFactory } from '@material-ui/core'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { purple, grey, lightBlue } from '@material-ui/core/colors'
import { Menu, Search, MoveToInbox, Mail, PlayCircleFilledWhite } from '@material-ui/icons';

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
    backgroundColor: 'rgba(0, 0, , 0.5)',
  },
  backImage: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: theme.spacing(0),
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    width: '100px',
    color: lightBlue[1000],
    opacity: 0.9,
    fontWeight: "bold",
    fontSize: 20,
    '&:hover': {
      backgroundColor: lightBlue[1000],
      opacity: 0.5,
    },
    padding: 5,
  },
}))(Button);

export default function SearchAppBar(props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>

      <Drawer classes={{ paper: styles.backImage }}
        variant="permanent"
        anchor="left"
      >
        <List className={styles.drawer}>
          <Card variant="outlined" className={styles.content}>
            <img src={Logo} style={{ width: '100%', opacity: 1 }} />
          </Card>
        </List>

        <Divider />
        <List className={styles.drawer}>
          <Card variant="outlined" className={styles.content}>
            <CardContent classes={styles.content} style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
              <ColorButton variant="text" color="primary" display="flex">
                로그인
              </ColorButton>
              <ColorButton variant="text" color="primary">
                회원가입
              </ColorButton>
            </CardContent>
          </Card>
          <Card>
            {/* 로그인 상태 정보가 들어갈 부분이에요 */}
          </Card>
        </List>
        <Divider />
        <List className={styles.drawer}>
          {[['All mail', 'Trash', 'Spam'], []].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
