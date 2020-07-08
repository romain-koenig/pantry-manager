import React, { Component } from 'react';

//Bootstrap
import CardColumns from 'react-bootstrap/CardColumns';

//My Components
import Product from './Product';
import ProductsBadges from './ProductsBadges';

class Products extends Component {

  state = { onlyAlert: false }


  filter = (obj, predicate) => {
    let result = {}, key;

    for (key in obj) {
      if (obj.hasOwnProperty(key) && predicate(obj[key])) {
        result[key] = obj[key];
      }
    }

    return result;
  };

  showOnlyAlert = () => {
    this.setState({
      onlyAlert: !this.state.onlyAlert
    })
  }

  render() {

    const productsToDisplay = this.state.onlyAlert ?
      this.filter(this.props.products, product => product.quantity <= product.desiredQuantity) :
      this.props.products;
    return (
      <>
        <ProductsBadges
          products={this.props.products}
          showOnlyAlert={this.showOnlyAlert} />

        <CardColumns>

          {Object.keys(productsToDisplay).map(key =>
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
      </>
    );
  }
}

export default Products;