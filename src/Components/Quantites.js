import React from 'react';
import PropTypes from 'prop-types';
import PlusMinus from './PlusMinus';

const Quantites = props => {
  return (
    <>
      <div className="row justify-content-between align-items-center mx-lg-4">

        <div className="stock">En stock : {props.quantity}</div>

        <PlusMinus
          id={props.id}
          plus={props.quantityUp}
          minus={props.quantityDown} />

      </div>

      <div className="row justify-content-between align-items-center mx-lg-4">

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

};

export default Quantites;