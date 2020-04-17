import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';
import ClothesResister from './pages/ClothesResisterPage';
import Closet from './pages/ClosetPage';

function App() {
  return (
    <Router>
      <Route path="/" exact render={() => <MainPage/>} />
      <Route path="/clothesresister" exact component={ClothesResister} />
      <Route path="/closet" exact component={Closet} />
    </Router>
  );
}

export default App;
