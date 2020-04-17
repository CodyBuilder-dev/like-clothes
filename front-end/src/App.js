import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';

import ClothesResister from './pages/ClothesResisterPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <MainPage/>} />
        <Route path="/clothesresister" exact component={ClothesResister} />
        <Route path="/closet" exact component={Closet} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
