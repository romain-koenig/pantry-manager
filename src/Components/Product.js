import React, { useState } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

//My Components
import ProductDetails from './ProductDetails';
import Quantites from './Quantites';

//Styles Components
import styled from 'styled-components';

const Product = props => {

  const [modalDetailsProduitsShow, setModalDetailsProduitsShow] = useState(false);

  const { name, quantity, desiredQuantity } = props.product;

  const cardColor = (quantity > desiredQuantity && quantity < desiredQuantity + 3) ? "light" :
    quantity === desiredQuantity ? "warning" :
      quantity < desiredQuantity ? "danger" :
        "success";

  const StyledButton = styled(Button)`margin-top: 1rem`

  return (
    <>
      <ProductDetails
        show={modalDetailsProduitsShow}
        onHide={() => setModalDetailsProduitsShow(false)}
        id={props.id}
        product={props.product}
        quantityUp={props.quantityUp}
        quantityDown={props.quantityDown}
        desiredQuantityUp={props.desiredQuantityUp}
        desiredQuantityDown={props.desiredQuantityDown}
        deleteProduct={props.deleteProduct}
      />
      <Card
        bg={cardColor}>

        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
          </Card.Title>
          <Card.Text>
          </Card.Text>

          <Quantites
            id={props.id}
            quantity={quantity}
            desiredQuantity={desiredQuantity}
            quantityUp={props.quantityUp}
            quantityDown={props.quantityDown}
            desiredQuantityUp={props.desiredQuantityUp}
            desiredQuantityDown={props.desiredQuantityDown}

          />




          <StyledButton
            variant="info"
            onClick={() => setModalDetailsProduitsShow(true)}
            block
          >
            Détails <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>

          </StyledButton>

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
