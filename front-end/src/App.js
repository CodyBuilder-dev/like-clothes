import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainReduxContainer from './store/Container/MainReduxContainer';
import ClothesResister from './pages/ClothesRegisterPage';
import Closet from './pages/ClosetPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <MainReduxContainer />} />
        <Route path="/clothesregister" exact component={ClothesResister} />
        <Route path="/closet" exact component={Closet} />
        <Route path="*" component={NotFound} />
      </Switch>re
    </Router>
  );
}

export default App;
