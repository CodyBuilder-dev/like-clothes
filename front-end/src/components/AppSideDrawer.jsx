import React from 'react';
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Search, MoveToInbox, Mail } from '@material-ui/icons';
import ScrollToTopButton from './ScrollToTopButton'

const drawerWidth = '240px';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
}));

export default function SearchAppBar(props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Drawer
        className={styles.drawer}
        variant="persistent"
        open="true"
        styles={{
          paper: styles.drawerPaper,
        }}
        anchor="left"
      >
        <div className={styles.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
