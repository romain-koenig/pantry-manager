import React from 'react';
import PropTypes from 'prop-types';
import PlusMinus from './PlusMinus';

const Quantites = props => {
  return (
    <>
      <div className="row justify-content-between align-items-center px-2 px-md-3 px-lg-4">

        <div className="stock">En stock : {props.quantity}</div>

        <PlusMinus
          id={props.id}
          plus={props.quantityUp}
          minus={props.quantityDown} />

      </div>

        <div className="row justify-content-between align-items-center px-2 px-md-3 px-lg-4">

        <div className="seuil">A conserver : {props.desiredQuantity}</div>

        <PlusMinus
          id={props.id}
          plus={props.desiredQuantityUp}
          minus={props.desiredQuantityDown} />

      </div>
    </>
  );
};

Quantites.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  desiredQuantity: PropTypes.number.isRequired,
  quantityUp: PropTypes.func.isRequired,
  quantityDown: PropTypes.func.isRequired,
  desiredQuantityUp: PropTypes.func.isRequired,
  desiredQuantityDown: PropTypes.func.isRequired,
};

export default Quantites;