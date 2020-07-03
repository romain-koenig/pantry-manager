import React, { Component } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';
import PlusMinus from './PlusMinus';

//Barcode
import Barcode from 'react-barcode';

class Product extends Component {
  render() {
    const { name, quantity, desiredQuantity, photo } = this.props.product;

    const cardColor = (quantity > desiredQuantity && quantity < desiredQuantity + 3) ? "light" :
      quantity === desiredQuantity ? "warning" :
        quantity < desiredQuantity ? "danger" :
          "success";
    return (
      <Card
        bg={cardColor}>

        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
          </Card.Title>
          <Card.Text>

            <div className="stock">En stock : {quantity}</div>
            
            <PlusMinus
            id={this.props.id}
            plus={this.props.quantityUp}
            minus={this.props.quantityDown} />
            
            <div className="seuil">A conserver : {desiredQuantity}</div>

            <PlusMinus
            id={this.props.id}
            plus={this.props.desiredQuantityUp}
            minus={this.props.desiredQuantityDown} />
            

            <Barcode value={this.props.id} />

          </Card.Text>


        </Card.Body>
        <Card.Img
          variant="bottom"
          src={photo} />
      </Card>
    );
  }
}

export default Product