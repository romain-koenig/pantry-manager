import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

//Application components
import Instructions from './Components/Instructions';

//Test data
import products from './test-data/products'
import defaultPantryProducts from './test-data/defaultPantryProducts.js'


class App extends Component {

  //ProductsData = hardcoded data coming from OpenFoodFact until accès to API

  state = {
    instructionsVisible: true,
    productsData: products,
    pantryProducts: {}
  };


  loadDefaultProducts = () => {
    this.setState({
      pantryProducts: defaultPantryProducts
    })
  };

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
          <h1>Dans mon placard...</h1>
          {
            this.state.instructionsVisible ?
              <Instructions hideInstructions={this.hideInstructions} /> :
              null
          }
        </Jumbotron>

        {/*here are the products*/}

        <ul>
          {Object.keys(this.state.pantryProducts).map(key => <li>{key}</li>)}
        </ul>

        {/* Buttons to manage the app */}

        {
          !this.state.instructionsVisible ?
            <Button
              variant="info"
              onClick={this.showInstructions}>
              Revoir les instructions
            </Button> :
            null
        }
        <Button
          variant="info"
          onClick={this.loadDefaultProducts}>
          TEST : charger les produits par défaut
        </Button>


      </div>
    );
  }
}

export default App;