import React, { Component } from 'react';

//Bootstrap
import CardColumns from 'react-bootstrap/CardColumns'

//My Components
import Product from './Product'

class Products extends Component {
  render() {
    return (
      <CardColumns>

        {Object.keys(this.props.products).map(key =>
          <Product
            key={key}
            id={key}
            product={{
              name: this.props.productData[key].product_name_fr,
              quantity: this.props.products[key].quantity,
              desiredQuantity: this.props.products[key].desiredQuantity,
              photo: this.props.productData[key].image_front_url
            }}
            quantityUp={(key) => this.props.quantityUp(key)}
            quantityDown={(key) => this.props.quantityDown(key)}
            desiredQuantityUp={(key) => this.props.desiredQuantityUp(key)}
            desiredQuantityDown={(key) => this.props.desiredQuantityDown(key)}
          />
        )}

      </CardColumns>
    );
  }
}

export default Products;