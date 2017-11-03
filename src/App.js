import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tester from './Tester'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header"></div>
        <div> select test option below </div>
        <Tester/>
      </div>
    );
  }
}

export default App;
