import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
import { handleProducts } from "../actions/shared";
import{filterProducts} from '../assets/utilities'




class DashBoard extends Component {
  componentDidMount() {
    if (this.props.loading) {
      this.props.dispatch(handleProducts());
    } else return;
  }

  render() {
    const { category, loading, products } = this.props;
    let filteredProducts = [];
    const params = new URLSearchParams(this.props.location.search);
 console.log(params,"this params is search history");

    
    if (products !== null) {
      filteredProducts = filterProducts(products, params);
    }
    console.log(filteredProducts,params.toString().length , "filteredProducts FTER ALL");
    let newproducts =params.toString().length === 0 ?   products:filteredProducts;

    return (
      <div>
        {loading ? null : (
          <>
            <div className="categoryName">
              <h3>{category.name.toUpperCase()}</h3>
            </div>

            <div className="container">
              {newproducts.map((p) => (
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
