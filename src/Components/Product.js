import React, { Component } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';

import Barcode from 'react-barcode';

class Product extends Component {
  render() {
    const { name, quantity, desiredQuantity, photo } = this.props.product;


    return (
      <Card>
        <Card.Img
          variant="bottom"
          src={photo} />

        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
          </Card.Title>
          <Card.Text>

            <p>En stock : {quantity}</p>
            <p>A conserver : {desiredQuantity}</p>

            <Barcode value={this.props.id} />
            
            </Card.Text>


        </Card.Body>
      </Card>
    );
  }
}

export default Product