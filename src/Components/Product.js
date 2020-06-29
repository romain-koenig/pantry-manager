import React, { Component } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card'


class Product extends Component {
  render() {
    const { name, quantity, desiredQuantity, photo } = this.props.product;

    return (
      <Card>
        <Card.Img
          variant="top"
          src={photo} />
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>
          <Card.Text>
            {this.props.id}

            {quantity}

            {desiredQuantity}
          </Card.Text>


        </Card.Body>
      </Card>
    );
  }
}

export default Product