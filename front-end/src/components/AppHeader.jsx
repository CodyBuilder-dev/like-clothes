import React from 'react';
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Search, MoveToInbox } from '@material-ui/icons';
import ScrollToTopButton from './ScrollToTopButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SearchAppBar(props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar id="back-to-top-anchor">
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Menu />
          </IconButton>
          <Typography className={styles.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={styles.search}>
            <div className={styles.Search}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              styles={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}
