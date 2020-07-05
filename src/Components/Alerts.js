import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Toast from 'react-bootstrap/Toast';

const Alerts = props => {
  
  return (
        <Toast onClose={() => props.removeAlert()} delay={4000} autohide>
          <Toast.Header>
            <strong className="mr-auto">{props.productName ? props.productName : "Produit non trouvé"}</strong>
          </Toast.Header>
          <Toast.Body>{
            props.alertType === 'ok_added' ? 
            "Produit ajouté" :
            props.barcode + " non trouvé"
          }</Toast.Body>
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