import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class AddProduct extends Component {

  barcodeRef = React.createRef()

  static propTypes = {
    addProduct: PropTypes.func.isRequired,
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

  render() {
    return (      
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
    );
  }
}

export default AddProduct;