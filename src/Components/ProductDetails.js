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
                Supprimer le produit <span role="img" aria-label="poubelle">🚮</span>
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