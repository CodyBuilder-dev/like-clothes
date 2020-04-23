import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import AppSideDrawer from './components/AppSideDrawer'
import MainReduxContainer from './store/Containers/MainReduxContainer';
import Landing from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';

import SignUp from './pages/users/SignUp';
import SignIn from './pages/users/SignIn';

import ChoiceStylePage from './pages/ChoiceStylePage';

const useStyles = makeStyles((theme) => ({
  contents: {
    width: '100%',
    display: 'flex',
    marginLeft: '240px',
    padding: theme.spacing(3),
  }
}));

function App() {
  const styles = useStyles();

  return (
    <Router>
      <AppSideDrawer></AppSideDrawer>
      <div className={styles.contents}>
        <Switch>
          <Route path="/" exact render={() => <MainReduxContainer />} />
          <Route path="/intro" exact component={Landing} />
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/clothesregister" exact component={ClothesRegister} />
          <Route path="/closet" exact component={Closet} />

          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />

          <Route path="/choicestyle" exact component={ChoiceStylePage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
