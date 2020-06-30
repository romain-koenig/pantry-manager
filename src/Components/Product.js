import React, { Component } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

//Barcode
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

            <div className="stock">En stock : {quantity}</div>
            <div className="seuil">A conserver : {desiredQuantity}</div>
            
            <ButtonGroup>
              <Button
                onClick={() => this.props.quantityUp(this.props.id)}
                variant="primary">
                <span role="img" aria-label="+">
                  ➕
                </span>
              </Button>
              <Button
                onClick={() => this.props.quantityDown(this.props.id)}
                variant="primary">
                <span role="img" aria-label="-">
                  ➖
                </span>
              </Button>
            </ButtonGroup>
            <Barcode value={this.props.id} />
            
            </Card.Text>


        </Card.Body>
      </Card>
    );
  }
}

export default Product