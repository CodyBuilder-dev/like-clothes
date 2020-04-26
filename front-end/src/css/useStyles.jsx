import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const Background = require('../components/Background.jpg')

export const appjs = makeStyles((theme) => ({
  contents: {
    width: 'calc(100% - 342px)',
    display: 'flex',
    marginLeft: '296px',
    margin: theme.spacing(7),
  },
  background: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat-y',
    backgroundSize: '100%',
    overflow: 'hidden',
  }
}));

const drawerWidth = 240;

export const appsidedrawerjsx = makeStyles((theme) => ({
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
    opacity: 0.95
  },
  buttonLogout: {
    position: 'absolute',
    bottom: theme.spacing(2),
    height: '37px',
    fontSize: '15px',
    opacity: 0.9
  },
  listContent: {
    width: '100%',
    height: '45px',
    fontSize: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    opacity: 0.9
  },
}));

export const clothesdetailjsx = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 400,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  button: {
    width: '100%',
    fontSize: '15px',
    opacity: 0.9
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export const closetjsx = makeStyles((theme) => ({
  root: {
    fontFamily: 'Arita-dotum-Medium',
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  editBtn: {
    marginLeft: '5px',
    width: '17px',
    height: '17px',
  },
  closetIntro: {
    margin: '0 15px',
  },
  closetIntroContent: {
    height: '50px',
    margin: '5px 0 20px 0',
  },
  followDrop: {
    marginLeft: '10px',
    // position: 'absolute',
  }
}));