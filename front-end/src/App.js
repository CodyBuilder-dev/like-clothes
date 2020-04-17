import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <MainPage/>} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
