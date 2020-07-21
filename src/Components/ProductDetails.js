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
              <br />
              *** Plus d'infos ici... à venir... ***<br />
              <br />
              Des corrections à apporter sur ce produit ?<br />
              Consultez et modifiez ce produit sur <a
                href={`https://fr.openfoodfacts.org/produit/${props.id}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenFoodFacts
              </a>
              <Barcode value={props.id} />
              <Button
              variant="danger"
              onClick={_ => props.deleteProduct(props.id)}
              >
                Supprimer le produit <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
                
              </Button>
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
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  quantityUp: PropTypes.func.isRequired,
  quantityDown: PropTypes.func.isRequired,
  desiredQuantityUp: PropTypes.func.isRequired,
  desiredQuantityDown: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default ProductDetails;