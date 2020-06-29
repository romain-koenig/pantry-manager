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
          productData={this.state.productsData} />


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