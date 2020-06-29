import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';

import Instructions from './Components/Instructions';


class App extends Component {

  state = { instructionsVisible: true };

  hideInstructions = () => {
    this.setState({ instructionsVisible: false })
  }
  render() {
    return (
      <div className="container">

        <Jumbotron hideInstructions={this.hideInstructions}>
          <h1>Placard Manager</h1>
          {
            this.state.instructionsVisible ?
              <Instructions hideInstructions={this.hideInstructions} /> :
              null
          }
        </Jumbotron>

      </div>
    );
  }
}

export default App;