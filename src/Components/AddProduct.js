import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Quagga from 'quagga';

//Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class AddProduct extends Component {

  state = {
    showScan: false,
  }

  barcodeRef = React.createRef()

  static propTypes = {
    addProduct: PropTypes.func.isRequired,
    videoError: false,
    videoInit: false,
  }

  // Get product info from Open Food Data
  async getInfosFromOpenFoodData(barcode) {
    return new Promise(async (resolve, reject) => {

      let res;
      // Get new data from API 
      res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        // HERE we should send headers with contact info, but not working 
        // , {
        //   headers: {
        //     'User-Agent': 'My-Pantry App / TESTING contact@kromatic.fr'
        //   }}
      )
        .catch(e => {
          console.error(e);
          return null;
        }
        )
      let data = await res.json()

      //Status === 1 <=> Product found
      if (data.status === 1) {
        resolve(
          {
            "product_name_fr": data.product.product_name_fr,
            "image_front_url": data.product.image_front_url,
            "code": data.product.code,
          });
      }
      else {
        console.log(`Product ${barcode} not found`);
        resolve(null);
      }
    });
  }

  addProduct = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();

    const barcodeTyped = this.barcodeRef.current.value;
    console.log(`Typed value : ${barcodeTyped}`);

    this.getInfosFromOpenFoodData(barcodeTyped)
      // Pass the scanned Product to parent component
      .then((searchedProduct) =>
        this.props.addProduct(searchedProduct, barcodeTyped))
      .catch(e => console.error(e));

    //reset the form
    event.currentTarget.reset();
  }

  showScan = () => {
    this.setState({ showScan: true });

    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      // safely access `navigator.mediaDevices.getUserMedia`

      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 4,
        locate: true,
        decoder: {
          readers: [
            'code_128_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader'
          ]
        }
      }, (err) => {
        if (err) {
          this.setState({ videoError: true });
          return;
        }
        this.onInitSuccess();
      });


      Quagga.onDetected(this.onDetected);
    }
  }

  onInitSuccess = () => {
    Quagga.start();
    this.setState({ videoInit: true });
  }

  onDetected = (result) => {
    Quagga.offDetected(this.onDetected);
    Quagga.stop();
    this.setState({ showScan: false });
    alert(`QUAGGA - code found : ${result.codeResult.code}`);
    console.log(`QUAGGA - code found : ${result.codeResult.code}`);
  }


  render() {
    return (
      <>
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

        {/*
          <Button variant="primary"
          onClick={this.showScan}>
          SCAN <span role="img" aria-label="photo">📷</span> TEST pas encore utilisable</Button>
          
          <div style={{ display: this.state.showScan ? 'block' : 'none' }} id="video">
          
          </div>
          
        */}

      </>
    );
  }
}

export default AddProduct;