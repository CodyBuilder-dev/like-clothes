import React from 'react';
import configureStore, { initState } from './store/configureStore';
import { PureComponent } from 'react';
import { Provider } from 'react-redux';
import App from './App'

export default class ReduxApp extends PureComponent {
  store = configureStore(initState);
  
  render() {
    // console.log('store.getState():', this.store.getState());
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}