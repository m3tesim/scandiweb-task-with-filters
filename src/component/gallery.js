import React, { Component } from "react";

export default class Gallery extends Component {
  state = {
    value: 0,
  };

  toglleImg = (index) => {
    this.setState(() => ({
      value: index,
    }));
  };
  render() {
    const { product } = this.props;
    return (
      <div>
        <div className="images-container ">
          <div className="img-nav">
            {product.gallery.map((img, index) => (
              <img
                alt="product-img"
                onClick={() => this.toglleImg(index)}
                key={index}
                src={img}
              />
            ))}
          </div>

          <div>
            <img alt="product-img" src={product.gallery[this.state.value]} />
          </div>
        </div>
      </div>
    );
  }
}
