import React, { useState } from 'react';

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

//My Components
import ProductDetails from './ProductDetails';
import Quantites from './Quantites';

//Styles Components
import styled from 'styled-components';

//Icons
import { Search } from 'tabler-icons-react';

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
            Détails <Search
              size={24}
              strokeWidth={2}
              color={'currentColor'}
            />

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
