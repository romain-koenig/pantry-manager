import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Toast from 'react-bootstrap/Toast';

const Alerts = props => {

  let message = ""
  switch (props.alertType) {
    case 'ok_added':
      message = `Produit ajouté`;
      break;
    case 'error_not_found':
      message = `Produit non trouvé ${props.barcode}`;
      break;
    case 'warn_arleady_there':
      message = `Le produit est déjà présent`;
      break;
    default:
      message = "Il semble y avoir un problème";
      break;
  }
  
  if (props.alertType === 'ok_added') {
    message = "Produit ajouté";
  }

  return (
    <Toast onClose={() => props.removeAlert()} delay={4000} autohide>
      <Toast.Header>
        <strong className="mr-auto">{props.productName ? props.productName : "Produit non trouvé"}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

Alerts.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alertType: PropTypes.oneOf(['ok_added', 'error_not_found', 'warn_arleady_there']).isRequired,
  productName: PropTypes.string,
  barcode: PropTypes.string.isRequired,
};

export default Alerts;