import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

//Styled Components
import styled from 'styled-components'

//Application components
import Instructions from './Components/Instructions';
import Products from './Components/Products';

//Test data
import products from './test-data/products';
import defaultPantryProducts from './test-data/defaultPantryProducts.js';

//Firebase
import base from './base'


class App extends Component {

  //ProductsData = hardcoded data coming from OpenFoodFact until accès to API

  state = {
    instructionsVisible: true,
    productsData: products,
    pantryProducts: {}
  };

      //lifecycle management

      componentDidMount() {
        console.log("Mounted !")
        this.ref = base.syncState('pantry/TEST',
            {
                context: this,
                state: 'pantryProducts'
            });

    }

    componentDidUpdate() {
        localStorage.setItem('pantry/TEST', JSON.stringify(this.state.pantryProducts));
    };


    componentWillUnmount() {
        base.removeBinding(this.ref);
    };


    //End Lifecycle management


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

  updateQuantity = (key, qty) => {
    //1. take a copy of existing state
    const pantryProducts = { ...this.state.pantryProducts };
    //2. Update Quantity
    pantryProducts[key].quantity = pantryProducts[key].quantity + qty;
    //3. Update the state
    this.setState({ pantryProducts: pantryProducts })
  }

  quantityUp = (key) => {
    this.updateQuantity(key, 1);
  }
  quantityDown = (key) => {
    this.updateQuantity(key, -1);
  }

  quantityDown = (key) => {

    //1. take a copy of existing state
    const pantryProducts = { ...this.state.pantryProducts };
    //2. Update Quantity
    pantryProducts[key].quantity = pantryProducts[key].quantity > 0 ?
      pantryProducts[key].quantity - 1 :
      0;
    //3. Update the state
    this.setState({ pantryProducts: pantryProducts })
  }

  render() {

    const StyledJumbotron = styled(Jumbotron)`background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.9) 100%),
    url(https://i.postimg.cc/ncrVnSLB/pexels-photo-4440173.png)`;


    return (
      <div className="container">

        <StyledJumbotron>
          <h1>Dans mon placard...</h1> 
          {
            this.state.instructionsVisible ?
              <Instructions hideInstructions={this.hideInstructions} /> :
              null 
          }
        </StyledJumbotron>

        {/*here are the products*/}

        <Products
          products={this.state.pantryProducts}
          productData={this.state.productsData}
          quantityUp = {(key) => this.quantityUp(key)}
          quantityDown = {(key) => this.quantityDown(key)} />


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

        <footer>
          Image bannière :
Photo by <a
            href="https://www.pexels.com/@taryn-elliott?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="blank">Taryn Elliott</a> from <a
              href="https://www.pexels.com/photo/clear-glass-jars-on-white-wooden-shelf-4440173/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
              target="blank">Pexels</a>
        </footer>
      </div>
    );
  }
}

export default App;