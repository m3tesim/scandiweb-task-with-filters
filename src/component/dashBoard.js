import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
import { handleProducts } from "../actions/shared";
import { getAttributes } from "./filter";
class DashBoard extends Component {
  state = {
    filteredProducts: null,
  };

  componentDidMount() {
    if (this.props.loading) {
      this.props.dispatch(handleProducts());
    } else return;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      console.log(this.props.location.search, "url from dashboard");
      const params = new URLSearchParams(this.props.location.search);
      const size = params.get("Size"); // bar
      const capacity = params.get("Capacity"); // bar

      console.log(params, " search params from dash board");
      console.log(size, " size from dash board");
      console.log(capacity, " size from dash board");

      const filteredProducts = this.filterProducts(this.props.products, "Size");
      this.setState({
        filteredProducts
      });
      console.log(filteredProducts, " 111from filtr rsult fnction ");
      console.log("products list ubdated ");
    }
  }

  filterProducts = (products, filter) => {
    const filteredProducts = [];

    for (let product of products) {
      let attributes = product.attributes?.filter(
        (atr) => atr?.name === filter
      );
      if (attributes.length > 0) filteredProducts.push(product);
    }
   
    return filteredProducts;
  };

  //apply filters on products

  render() {
    const { category, loading } = this.props;
    const  products  = this.state.filteredProducts||this.props.products;

    //let atrs=getAttributes(products)
console.log(this.state.filteredProducts,"state form dash board");
    console.log(products, "test filter on those");
    // console.log(atrs, "test atrs  on those");

    //   console.log("this category dashboard page "+category)
    //const filteredProducts=this.filterProdcts(this.props.products, "Size")

    // console.log( filteredProducts, " 222 from filtr rsult fnction ");

    return (
      <div>
        {loading ? null : (
          <>
            <div className="categoryName">
              <h3>{category.name.toUpperCase()}</h3>
            </div>

            <div className="container">
              {products.map((p) => (
                <div key={p.id}>
                  <ProductThumbnail id={p.id} />{" "}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);

function mapStateToProps({ products }) {
  const theproduct = products ? products.category.products : null;
  const category = products ? products.category : null;
  return {
    loading: products === null,

    products: theproduct,
    category: category,
  };
}
