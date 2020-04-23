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
import RecommendPage from './pages/RecommendPage'

const useStyles = makeStyles((theme) => ({
  contents: {
    width: 'calc(100% - 240px)',
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
          <Route path="/recommend" exact component={RecommendPage} />
          <Route path="/closet" exact component={Closet} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
