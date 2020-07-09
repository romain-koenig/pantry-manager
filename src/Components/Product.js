import React, { useState } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

//My Components
import ProductDetails from './ProductDetails';
import Quantites from './Quantites';

const Product = props => {


  const [modalShow, setModalShow] = useState(false);

  const { name, quantity, desiredQuantity } = props.product;

  const cardColor = (quantity > desiredQuantity && quantity < desiredQuantity + 3) ? "light" :
    quantity === desiredQuantity ? "warning" :
      quantity < desiredQuantity ? "danger" :
        "success";
  return (
    <>
      <ProductDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        product={props.product}
        quantityUp={props.quantityUp}
        quantityDown={props.quantityDown}
        desiredQuantityUp={props.desiredQuantityUp}
        desiredQuantityDown={props.desiredQuantityDown}
      />
      <Card
        bg={cardColor}>

        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
          </Card.Title>
          <Card.Text>

            <Quantites
              id={props.id}
              quantity={quantity}
              desiredQuantity={desiredQuantity}
              quantityUp={props.quantityUp}
              quantityDown={props.quantityDown}
              desiredQuantityUp={props.desiredQuantityUp}
              desiredQuantityDown={props.desiredQuantityDown}

            />

            <Button
              variant="info"
              onClick={() => setModalShow(true)}
              block
            >
              Détails
            </Button>

          </Card.Text>

        </Card.Body>
        {/*
        <Card.Img
          variant="bottom"
          src={photo} />
        */}
      </Card>
    </>
  );
}


export default Product
