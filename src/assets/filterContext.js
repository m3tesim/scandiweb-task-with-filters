import React, { Component } from "react";

 const FilterContext = React.createContext();

 class FilterContextProvider extends Component {
  state = {
    reset: false,
  };
  resetFunction() {
    this.setState({ reset: true });
  }
  render() {
    console.log(this.state.reset,"from filter context");

    return (
      <FilterContext.Provider
      active={this.state.reset}
      reset={()=>this.resetFunction()}
      >
        {this.props.children}
        </FilterContext.Provider>
    );
  }
}
