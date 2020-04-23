import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core'
import './App.css';

import AppSideDrawer from './components/AppSideDrawer'
import MainReduxContainer from './store/Containers/MainReduxContainer';
import Landing from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';
import RecommendPage from './pages/RecommendPage'

import SignUp from './pages/users/SignUp';
import SignIn from './pages/users/SignIn';

const useStyles = makeStyles((theme) => ({
  contents: {
    width: 'calc(100% - 240px)',
    display: 'flex',
    marginLeft: '240px',
    padding: theme.spacing(2),
  }
}));

function App() {
  const styles = useStyles();

  return (
    <Router>
      <AppSideDrawer></AppSideDrawer>
      <Card className={styles.contents} id="back-to-top-anchor">
        <Switch>
          <Route path="/" exact render={() => <MainReduxContainer />} />
          <Route path="/intro" exact component={Landing} />
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/clothesregister" exact component={ClothesRegister} />
          <Route path="/recommend" exact component={RecommendPage} />
          <Route path="/closet" exact component={Closet} />

          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />

          <Route path="*" component={NotFound} />
        </Switch>
      </Card>
    </Router>
  );
}

export default App;
