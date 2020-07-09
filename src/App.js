import React, { Component } from 'react';

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

//Styled Components
import styled from 'styled-components'

//Application components
import Instructions from './Components/Instructions';
import Products from './Components/Products';
import Login from './Components/Login';
import Alerts from './Components/Alerts';

//Test data
import productsSimple from './test-data/productsSimple';
import defaultPantryProducts from './test-data/defaultPantryProducts.js';

//Firebase
import base, { firebaseApp } from "./base";
import firebase from 'firebase/app';
import User from './Components/User';
import AddProduct from './Components/AddProduct';

class App extends Component {

  //ProductsData = hardcoded data coming from OpenFoodFact until accès to API

  state = {
    instructionsVisible: true,
    productsData: {},
    pantryProducts: {},
    uid: null,
    userName: null,
    authProvider: null,
    alerts: [],
  };


  //lifecycle management

  componentDidMount() {
    // Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
      this.authHandler({ user });
    })
  }

  componentDidUpdate() {
    // localStorage.setItem(`pantry/${this.state.uid}`, JSON.stringify(this.state.pantryProducts));
  };

  componentWillUnmount() {
    this.cleanDataBinding();
  };

  //End Lifecycle management

  loadDefaultProducts = () => {
    this.setState({
      productsData: productsSimple,
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

  updateDesiredQuantity = (key, qty) => {
    //1. take a copy of existing state
    const pantryProducts = { ...this.state.pantryProducts };
    //2. Update Quantity
    pantryProducts[key].desiredQuantity = pantryProducts[key].desiredQuantity + qty;
    //3. Update the state
    this.setState({ pantryProducts: pantryProducts })
  }


  quantityUp = (key) => {
    this.updateQuantity(key, 1);
  }
  quantityDown = (key) => {
    const pantryProducts = { ...this.state.pantryProducts };

    if (pantryProducts[key].quantity > 0) {
      this.updateQuantity(key, -1);
    }
  }

  desiredQuantityUp = (key) => {
    this.updateDesiredQuantity(key, 1);
  }
  desiredQuantityDown = (key) => {
    const pantryProducts = { ...this.state.pantryProducts };

    if (pantryProducts[key].desiredQuantity > 0) {
      this.updateDesiredQuantity(key, -1);
    }
  }


  // Authentication handling

  authHandler = async (authData) => {
    //Set the state of inventory component
    console.log(`Auth Data : `);
    console.log(authData);
    const userId = authData.user ? authData.user.uid : null;
    const userName = authData.user ? authData.user.displayName : null;
    const authProvider = authData.user ? authData.user.providerData[0].providerId : null;
    this.setState({
      uid: userId,
      userName: userName,
      authProvider: authProvider
    });

    // remove a previous databinding if not yet removed
    this.cleanDataBinding();

    //If connexion is OK, we create the databindings
    if (this.state.uid) {
      // Firebase sync
      await base.syncState(`pantry/productsData`,
        {
          context: this,
          state: 'productsData'
        })

      await base.syncState(`pantry/params/${this.state.uid}/instructionsVisible`,
        {
          context: this,
          state: 'instructionsVisible'
        });

      this.ref = base.syncState(`pantry/${this.state.uid}`,
        {
          context: this,
          state: 'pantryProducts'
        });
    }
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
    this.cleanDataBinding();
  };

  cleanDataBinding = () => {
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  };


  removeAlert = () => {

    const currentAlerts = this.state.alerts;
    currentAlerts.shift();
    this.setState({ alerts: currentAlerts });

  }

  deleteProduct = (productId) => {

    // Get current state
    const currentPantryProducts = { ...this.state.pantryProducts };
    // Set new product in the copy of state
    let filteredPantry = {}
    Object.keys(currentPantryProducts).forEach(key => {
      if (key !== productId) {
        filteredPantry[key] = currentPantryProducts[key];
        console.log(`I keep product ${key}`);
      }
      else {
        console.log(`I DON'T keep product ${key}`);
      }
    })
    //update state
    console.log("this.state.pantryProducts");
    console.log(this.state.pantryProducts);
    console.log("filteredPantry");
    console.log(filteredPantry);
    this.setState(
      {
        pantryProducts: filteredPantry
      }, _ => {
        console.log("this.state.pantryProducts AFTER SET STATE");
        console.log(this.state.pantryProducts);
      });
  }


  addProduct = (product, barcode) => {

    if (product === null) {
      console.log(`Pas de produit trouvé pour ${barcode}`);

      const currentAlerts = this.state.alerts;
      currentAlerts.push({
        type: 'error_not_found',
        productName: '',
        barcode: barcode,
      });
      this.setState({ alerts: currentAlerts });

      return;
    }

    console.log(`Product passed : ${product}`);

    // Get current state
    const currentProductsData = { ...this.state.productsData };
    // Set new product in the copy of state
    currentProductsData[barcode] = product;
    //update state
    this.setState(
      {
        productsData: currentProductsData
      });


    // Get current state for pantry
    const currentPantryProducts = { ...this.state.pantryProducts };

    if (!Object.keys(this.state.productsData).includes(barcode.toString())) {
      console.log(`*-*-*-*-* THIS SHOULD NEVER HAPPEN *-*-*-*-*`);
      console.log(`Barcode ${barcode} not foud in : `);
      console.log(Object.keys(this.state.productsData));
      return;
    }
    if (Object.keys(this.state.pantryProducts).includes(barcode.toString())) {
      console.log(`Barcode ${barcode} already in the pantry : `);
      console.log(Object.keys(this.state.pantryProducts));

      const currentAlerts = this.state.alerts;
      currentAlerts.push(
        {
          type: 'warn_arleady_there',
          productName: product.product_name_fr,
          barcode: barcode,
        }
      );
      this.setState({ alerts: currentAlerts });

      return;
    }


    const currentAlerts = this.state.alerts;
    currentAlerts.push(
      {
        type: 'ok_added',
        productName: product.product_name_fr,
        barcode: barcode,
      }
    );
    this.setState({ alerts: currentAlerts });


    console.log(`this.barcodeRef.value : ${barcode}`);
    currentPantryProducts[barcode] = {
      quantity: 1,
      desiredQuantity: 2
    };
    this.setState(
      {
        pantryProducts:
          currentPantryProducts
      });
  }


  // End authenticate methods

  render() {
    //this.getInfosFromOpenFoodData("8001505005599");

    const StyledJumbotron = styled(Jumbotron)`background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.9) 100%),
    url(https://i.postimg.cc/ncrVnSLB/pexels-photo-4440173.png)`;

    if (!this.state.uid) {
      return (
        <div className="container">
          <Login authenticate={this.authenticate}></Login>
        </div>
      )
    }
    return (
      <div className="container">

        <User
          userName={this.state.userName}
          authProvider={this.state.authProvider}
          logout={this.logout} />

        <StyledJumbotron>
          <h1>Dans mon placard...</h1>
          {
            this.state.instructionsVisible ?
              <Instructions hideInstructions={this.hideInstructions} /> :
              null
          }
        </StyledJumbotron>

        {/*here are the products*/}

        {/* NEW PRODUCT */}
        <AddProduct addProduct={this.addProduct} />

        {
          this.state.alerts.map(alert => {
            return <Alerts
              removeAlert={this.removeAlert}
              alertType={alert.type}
              productName={alert.productName}
              barcode={alert.barcode}
            />
          })
        }

        <Products
          products={this.state.pantryProducts}
          productData={this.state.productsData}
          quantityUp={(key) => this.quantityUp(key)}
          quantityDown={(key) => this.quantityDown(key)}
          desiredQuantityUp={(key) => this.desiredQuantityUp(key)}
          desiredQuantityDown={(key) => this.desiredQuantityDown(key)}
          deleteProduct={(key) => this.deleteProduct(key)} />


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