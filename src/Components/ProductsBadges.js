import React from 'react';

//Bootstrap
import Badge from 'react-bootstrap/Badge';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

//StyledComponents
import styled from 'styled-components';

const ProductsBadges = (props) => {

  const SpacedDiv = styled.div`margin-top: 10px;margin-bottom: 10px;`;

  const productTypes = Object.keys(props.products).length;
  const productsInStock = Object.keys(props.products).reduce((acc, elem) =>
    acc + props.products[elem].quantity, 0);
  const productsToStock = Object.keys(props.products).reduce((acc, elem) =>
    acc + props.products[elem].desiredQuantity, 0);

  const productsToBuy = Object.keys(props.products).reduce((acc, key) =>
    acc + (props.products[key].quantity < props.products[key].desiredQuantity ?
      props.products[key].desiredQuantity - props.products[key].quantity :
      0)
    , 0);

  return (
    <>
      <SpacedDiv>

        <span>Types de produits&nbsp;
    <Badge pill variant="light">{productTypes}</Badge>
        </span>
        <span> - Produits en stock&nbsp;
      <Badge pill variant="light">{productsInStock}</Badge>
        </span>
        <span> - Produits A conserver&nbsp;
      <Badge pill variant="light">{productsToStock}</Badge>
        </span>
        <span> - Produits manquants&nbsp;
          <Badge pill variant="light">{productsToBuy}</Badge>
        </span>
      </SpacedDiv>
      <SpacedDiv>

        <ToggleButtonGroup
          type="checkbox"
          onChange={props.showOnlyAlert}>

          <ToggleButton type="checkbox"
            checked={props.onlyAlert}
            variant={props.onlyAlert ? "outline-primary" : "primary"}
            value="0">
            {props.onlyAlert ? "Montrer tout" : "Montrer les produits en alerte uniquement"}
          </ToggleButton>
        </ToggleButtonGroup>

      </SpacedDiv>
    </>
  );
}

export default ProductsBadges;