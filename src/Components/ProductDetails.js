import React from 'react';
import PropTypes from 'prop-types';

//Boostrap
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

//Barcode
import Barcode from 'react-barcode';
import Quantites from './Quantites';

const ProductDetails = props => {
  const { name, quantity, desiredQuantity, photo } = props.product;


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id={props.id}>
          {name}
      </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Quantites
              id={props.id}
              quantity={quantity}
              desiredQuantity={desiredQuantity}
              quantityUp={props.quantityUp}
              quantityDown={props.quantityDown}
              desiredQuantityUp={props.desiredQuantityUp}
              desiredQuantityDown={props.desiredQuantityDown}
              />
              *** De la place pour plus d'infos ici... à venir...<br/>
              *** De la place pour plus d'infos ici... à venir...<br/>
              *** De la place pour plus d'infos ici... à venir...<br/>
              <Barcode value={props.id} />  
            </Col>
            <Col xs={12} md={4}>
              <Image
                src={photo}
                fluid
              />
            </Col>
          </Row>
          
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={props.onHide}>
          Fermer
      </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductDetails.propTypes = {

};

export default ProductDetails;