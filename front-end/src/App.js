import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import MainReduxContainer from './store/Containers/MainReduxContainer';
import SignInContainer from './store/Containers/SignInContainer';
import SignUpContainer from './store/Containers/SignUpContainer';

import AppSideDrawerContainer from './store/Containers/AppSideDrawerContainer';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import ClothesDetail from './pages/ClothesDetailPage';
import ClothesSubscribe from './pages/ClothesSubscribePage';
import ClothesRecommend from './pages/ClothesRecommendPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFoundPage';
import ChoiceStylePage from './pages/ChoiceStylePage';

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
            <Route path="/" exact render={() => <MainPage />} />
            <Route path="/clothesregister" exact component={ClothesRegister} />
            <Route path="/closet" exact component={Closet} />
            <Route path="/clothesdetail" exact component={ClothesDetail} />
            <Route path="/clothessubscribe" exact component={ClothesSubscribe}/>
            <Route path="/clothesrecommend" exact component={ClothesRecommend}/>
            <Route path="/choicestyle" exact component={ChoiceStylePage} />

            <Route path="/signup" exact component={SignUpContainer} />
            <Route path="/signin" exact component={SignInContainer} />

            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
