import React from 'react'
import { Zoom, Fab, useScrollTrigger } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowUp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  fabicon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const styles = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#root');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={styles.fabicon}>
        {children}
      </div>
    </Zoom>
  );
}

export default function SearchAppBar(props) {
  return (
    <ScrollTop {...props}>
      <Fab color="secondary" size="medium">
        <KeyboardArrowUp />
      </Fab>
    </ScrollTop>
  );
}