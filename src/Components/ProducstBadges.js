import React, { Component } from 'react';

//Bootstrap
import Badge from 'react-bootstrap/Badge';

//StyledComponents
import styled from 'styled-components';


class ProductsBadges extends Component {

  render() {
    const SpacedDiv = styled.div`margin-top: 10px;margin-bottom: 10px;`;
    
    const productTypes = Object.keys(this.props.products).length;
    const productsInStock = Object.keys(this.props.products).reduce((acc, elem) =>
      acc + this.props.products[elem].quantity, 0);
    const productsToStock = Object.keys(this.props.products).reduce((acc, elem) =>
      acc + this.props.products[elem].desiredQuantity, 0);

    const productsToBuy = productsToStock - productsInStock > 0 ?
      productsToStock - productsInStock :
      0;

    return (

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


    );
  }
}

export default ProductsBadges;