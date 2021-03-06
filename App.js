import React, { Component } from 'react';
import HomeStack from './src/navigation/HomeStack';
import { Provider } from 'react-redux';
import store from './src/store';



export default class App extends Component {  
  render() {
  
    return (
      <Provider store={store}>
        <HomeStack />
      </Provider>
    )
  }


};
