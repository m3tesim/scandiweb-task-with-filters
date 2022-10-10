import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
import { handleProducts } from "../actions/shared";
import { getAttributes } from "./filter";
class DashBoard extends Component {
 

  componentDidMount() {
    if (this.props.loading) {
      this.props.dispatch(handleProducts());
      this.filterProdcts(this.props.products, "Size");
    } else return;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      //products = this.props;
      console.log("products list ubdated ");
    }
  }

  render() {
    console.log(this.props.location.search, "url from dashboard");
    const params = new URLSearchParams(this.props.location.search);
    const size = params.get("Size"); // bar
    const capacity = params.get("Capacity"); // bar

    console.log(params, " search params from dash board");
    console.log(size, " size from dash board");
    console.log(capacity, " size from dash board");

    const { category, loading } = this.props;
    const { products } = this.props;

    //let atrs=getAttributes(products)

    console.log(products, "test filter on those");
   // console.log(atrs, "test atrs  on those");

    //   console.log("this category dashboard page "+category)

    const filterProdcts = (products, filter) => {
      const filteredProducts=[]

       for(let product of products) {
        let attributes = product.attributes?.filter(
          (atr) => atr?.name === filter
        );
        if (attributes.length > 0) filteredProducts.push(product);

       }

       return filteredProducts
    };
    console.log( filterProdcts(products,"Size"), "from filtr rsult fnction ");

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
