import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
import { handleProducts } from "../actions/shared";
import { getAttributes } from "./filter";
class DashBoard extends Component {
  componentDidMount() {
    if (this.props.loading) {
      this.props.dispatch(handleProducts());
    } else return;
  }

  filterProducts(products, filter) {
    let filteredProducts = [];
    for (let product of products) {
      let attributes = product.attributes?.filter(
        (atr) => atr?.name === filter
      );
      if (attributes.length > 0) filteredProducts.push(product);
    }

       return filteredProducts;
  }

  render() {
    const { category, loading } = this.props;

    const params = new URLSearchParams(this.props.location.search);
    //const size = params.get("Size"); // bar
   // const capacity = params.get("Capacity"); // bar'
    let filteredProducts=[];
    if (this.props.products !== null) {
      params.forEach((value,key)=>{
        let filter=this.filterProducts(this.props.products,key)
        console.log(filter,key+" key ?","inside loop of gettin filter from rl");
        filteredProducts=  filteredProducts.concat(filter)
      })
    //  filteredProducts = this.filterProducts(this.props.products, size);
    }
console.log( filteredProducts,"Filtered products ");
let products = (filteredProducts.length>0? filteredProducts : this.props.products)

    //let atrs=getAttributes(products)

    //   console.log("this category dashboard page "+category)
    //const filteredProducts=this.filterProdcts(this.props.products, "Size")

    // console.log( filteredProducts, " 222 from filtr rsult fnction ");
    console.log(this.props.location.search, "url from dashboard");

    console.log(params, " search params from dash board");
  //  console.log(size, " size from dash board");
   // console.log(capacity, " size from dash board");

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
