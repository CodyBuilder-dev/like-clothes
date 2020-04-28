import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import AppSideDrawer from './components/AppSideDrawer';
import MainReduxContainer from './store/Containers/MainReduxContainer';
import Landing from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import ClothesDetail from './pages/ClothesDetail';
import ClothesSubscribe from './pages/ClothesSubscribe';
import ClothesRecommend from './pages/ClothesRecommend';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';
// import RecommendPage from './pages/RecommendPage';
import SignUp from './pages/users/SignUp';
import SignIn from './pages/users/SignIn';
import ChoiceStylePage from './pages/ChoiceStylePage';
import AppSideDrawerContainer from './store/Containers/AppSideDrawerContainer';
import SignInContainer from './store/Containers/SignInContainer';

import { appjs } from './css/useStyles';

function App() {
  const styles = appjs();

  return (
    <div className={styles.background} id="back-to-top-anchor">
      <Router>
        <AppSideDrawerContainer></AppSideDrawerContainer>
        <div className={styles.contents}>
          <Switch>
            <Route path="/" exact render={() => <MainReduxContainer />} />
            <Route path="/intro" exact component={Landing} />
            <Route path="/" exact render={() => <MainPage />} />
            <Route path="/clothesregister" exact component={ClothesRegister} />
            {/* <Route path="/recommend" exact component={RecommendPage} /> */}
            <Route path="/closet" exact component={Closet} />
            <Route path="/clothesdetail" exact component={ClothesDetail} />
            <Route path="/clothessubscribe" exact component={ClothesSubscribe}/>
            <Route path="/clothesrecommend" exact component={ClothesRecommend}/>
            <Route path="/choicestyle" exact component={ChoiceStylePage} />

            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignInContainer} />

            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
