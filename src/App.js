import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';

import Instructions from './Components/Instructions';


class App extends Component {
  render() {
    return (
      <div className="container">

        <Jumbotron>
          <h1>Placard Manager</h1>
          <Instructions />
        </Jumbotron>

      </div>
    );
  }
}

export default App;