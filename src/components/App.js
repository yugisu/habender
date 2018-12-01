import React, { /* Component, */ PureComponent } from 'react';
import Header from './Header';
import Main from './Main';


class App extends PureComponent {
  render() {
    console.log(window.innerWidth, window.innerHeight);

    return (
      <div className="App">
        <div id="bg"></div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
