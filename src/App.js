import React, { Component } from 'react';
import Auth from "./authenticate.js";

import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <h1>Firebase Login App</h1>
        <Auth/>
      </div>
    );
  }
}

export default App;
