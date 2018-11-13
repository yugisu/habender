import React, { Component } from 'react';

import './App.css';
import Header from '../Header';
import Calendar from '../Calendar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Calendar />
      </div>
    );
  }
}

export default App;
