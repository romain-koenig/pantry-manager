import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


class App extends Component {
  render() {
    return (
      <div className="container">

      <Jumbotron>
      <h1>Placard Manager</h1>
      <p>Instructions...</p>
      <p>
      <Button variant="primary">Learn more</Button>
    </p>
      </Jumbotron>
        
      </div>
    );
  }
}

export default App;