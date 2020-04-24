import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import AppSideDrawer from './components/AppSideDrawer';
import MainReduxContainer from './store/Containers/MainReduxContainer';
import Landing from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import ClothesDetail from './pages/ClothesDetail';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';
import RecommendPage from './pages/RecommendPage';
import SignUp from './pages/users/SignUp';
import SignIn from './pages/users/SignIn';
import ChoiceStylePage from './pages/ChoiceStylePage';

import { appjs } from './css/useStyles';

function App() {
  const styles = appjs();

  return (
    <div className={styles.background}>
      <Router>
        <AppSideDrawer></AppSideDrawer>
        <div className={styles.contents} id="back-to-top-anchor">
          <Switch>
            <Route path="/" exact render={() => <MainReduxContainer />} />
            <Route path="/intro" exact component={Landing} />
            <Route path="/" exact render={() => <MainPage />} />
            <Route path="/clothesregister" exact component={ClothesRegister} />
            <Route path="/recommend" exact component={RecommendPage} />
            <Route path="/closet" exact component={Closet} />
            <Route path="/clothesdetail" exact component={ClothesDetail} />
            <Route path="/choicestyle" exact component={ChoiceStylePage} />

            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />

            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
