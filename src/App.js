import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

//Application components
import Instructions from './Components/Instructions';


class App extends Component {

  state = { instructionsVisible: true };

  hideInstructions = () => {
    this.setState({ instructionsVisible: false })
  }
  showInstructions = () => {
    this.setState({ instructionsVisible: true })
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
        {
          !this.state.instructionsVisible ?
            <Button variant="info" onClick={this.showInstructions}>Montrer les instructions</Button> :
            null
        }


      </div>
    );
  }
}

export default App;