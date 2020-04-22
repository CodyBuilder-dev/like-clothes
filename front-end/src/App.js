import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import MainReduxContainer from './store/Containers/MainReduxContainer';
import Landing from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ClothesRegister from './pages/ClothesRegisterPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <MainReduxContainer />} />
        <Route path="/intro" exact component={Landing} />
        <Route path="/" exact render={() => <MainPage/>} />
        <Route path="/clothesregister" exact component={ClothesRegister} />
        <Route path="/closet" exact component={Closet} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
