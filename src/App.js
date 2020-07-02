import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Styled Components
import styled from 'styled-components'

//Application components
import Instructions from './Components/Instructions';
import Products from './Components/Products';
import Login from './Components/Login';

//Test data
import productsSimple from './test-data/productsSimple';
import defaultPantryProducts from './test-data/defaultPantryProducts.js';

//Firebase
import base, { firebaseApp } from "./base";
import firebase from 'firebase';

class App extends Component {

  //ProductsData = hardcoded data coming from OpenFoodFact until accès to API

  state = {
    instructionsVisible: true,
    productsData: productsSimple,
    pantryProducts: {}
  };

  barcodeRef = React.createRef()


  //lifecycle management

  componentDidMount() {



    // Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
      this.authHandler({ user });
    })

  }

  componentDidUpdate() {
    localStorage.setItem(`pantry/${this.state.uid}`, JSON.stringify(this.state.pantryProducts));
  };


  componentWillUnmount() {
    if (this.ref) {
      base.removeBinding(this.ref);
    }
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

  authHandler = async (authData) => {
    //Set the state of inventory component
    const userId = authData.user ? authData.user.uid : null;
    this.setState({
      uid: userId,
    });

    if (userId) {
      // remove a previous databinding if not yet removed
      if (this.ref) {
        base.removeBinding(this.ref);
      }
      // Firebase sync
      this.ref = base.syncState(`pantry/${this.state.uid}`,
        {
          context: this,
          state: 'pantryProducts'
        });
    }
    else {
      if (this.ref) {
        base.removeBinding(this.ref);
      }
    }
    console.log(authData)
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    })
  };

  // Get product info from Open Food Data
  getInfosFromOpenFoodData = (barcode) => {

    //1 take a copy ok productsData
    const prodData = { ...this.state.productsData };
    //2 Get new data from API 
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      // HERE we should send headers with contact info, but not working 
      // , {
      //   headers: {
      //     'User-Agent': 'My-Pantry App / TESTING contact@kromatic.fr'
      //   }}
    )
      .then(res => res.json())
      .then((data) => {
        //Status === 1 <=> Product found
        if (data.status === 1) {

          //3 Add new data to the copy
          prodData[data.code] = {
            "product_name_fr": data.product.product_name_fr,
            "image_front_url": data.product.image_front_url,
            "code": data.product.code,
          };
          //4 Update the state
          console.log(`Updating state with product ${barcode} ${data.product.product_name_fr}`);
          this.setState({ productsData: prodData });
        }
        else {
          console.log(`Product ${barcode} not found`);
        }
      })
      .catch(console.log);
  }

  addProduct = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();

    console.log(this.barcodeRef);
    // Get current state

    const currentPantryProducts = { ...this.state.pantryProducts };

    const barcodeTyped = this.barcodeRef.current.value;

    this.getInfosFromOpenFoodData(barcodeTyped);

    if (Object.keys(this.state.productsData).includes(barcodeTyped.toString())) {
    console.log(`this.barcodeRef.value : ${barcodeTyped}`)  
    currentPantryProducts[barcodeTyped] = {
        quantity: 1,
        desiredQuantity: 2
      }
     this.setState({pantryProducts: currentPantryProducts}) 
    }
    else {
      console.log(`Barcode ${barcodeTyped} not foud in : `);
      console.log(Object.keys(this.state.productsData));
    }
    


    //reset the form
    event.currentTarget.reset();
  }

  render() {
    //this.getInfosFromOpenFoodData("8001505005599");

    const StyledJumbotron = styled(Jumbotron)`background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.9) 100%),
    url(https://i.postimg.cc/ncrVnSLB/pexels-photo-4440173.png)`;
    const logout = <Button onClick={this.logout} variant="danger">Déconnexion</Button>

    if (!this.state.uid) {
      return (
        <div className="container">
          <Login authenticate={this.authenticate}></Login>
        </div>
      )

    }
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
          quantityUp={(key) => this.quantityUp(key)}
          quantityDown={(key) => this.quantityDown(key)} />


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
        <Button
          variant="info"
          onClick={() => this.getInfosFromOpenFoodData("8001505005599")}>
          TEST : récupérer les infos du Nocciolata
            </Button>
        {logout}

        {/* NEW PRODUCT */}
        <Form onSubmit={this.addProduct}>
          <Form.Group controlId="barcode">
            <Form.Label>Ajouter un produit</Form.Label>
            <Form.Control type="number" placeholder="3596710456727" ref={this.barcodeRef} />
            <Form.Text className="text-muted">
              Code barre du produit à ajouter
            </Form.Text>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form.Group>
        </Form>

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