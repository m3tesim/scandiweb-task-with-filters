import React, { Component } from "react";
import SelectList from "./selectList";
import { RadioButton } from "./radioButton";
import CheckBox from "./checkBox";
import {getAttributes} from '../assets/utilities'






export const FilterContext = React.createContext();
class Filters extends Component {
  state = {
    filters: {},
    reset: false,
  };


  componentDidUpdate(prevProps,prevState){
    // this checks for the reset value that passed from filter parent and based on it 
    //set the value of the select list to null or do nothing
    if (prevProps.products !== this.props.products) {
      this.resetFilters(true)
  }}

  reset = (value) => {
    console.log("this.state after reset from selects is on ");

    this.setState({ reset: value });
  };

  params = new URLSearchParams();

  addFilter = (atr, item, remove) => {
    const params = new URLSearchParams();

    const { filters } = this.state;
    let newfilters;

    if (remove) {
      delete filters[atr];
      newfilters = filters;
    } else newfilters = Object.assign({}, filters, { [atr]: item });
    this.setState({
      filters: newfilters,
    });
    // console.log(newfilters, "filters before append");
    let filterAtributes = Object.keys(newfilters);
    // adding the filters to the url
    filterAtributes.map((atr) => params.append(atr, newfilters[atr]));

    return this.applyFilter(params);
  };

  applyFilter = (params) => {
    this.props.history.push({
      pathname: "/",
      search: params.toString(),
    });
  };

  resetFilters = (value) => {
    //this.setState({ reset: value });
    let filterAtributes = Object.keys(this.state.filters);

    filterAtributes.map((atr) => this.params.delete(atr));
    this.setState({
      filters: {},
      reset: value,
    });
    this.props.history.push({
      pathname: "/",
      search: null,
    });
    this.reset(value);
  };

 

  render() {
    let atributes = getAttributes(this.props.products);
    return (
      <div className="filtersContainer">
        <div className="filtersTitle">Filters</div>
        <FilterContext.Provider
          value={{ reset: this.reset, active: this.state.reset }}>
          <Attributes
            reset={this.state.reset}
            data={atributes}
            addFilter={this.addFilter}
            resetFunction={this.reset}
          />
        </FilterContext.Provider>
        <div>
          {" "}
          <button className=" viewBag" onClick={() => this.resetFilters(true)}>
            Reset Filters
          </button>
        </div>
      </div>
    );
  }
}

export default Filters;

class Attributes extends Component {
  state = {
    sizeListActive: false,
    capacityList: false,
  };
  sizeDropDown() {
    this.setState({ sizeListActive: !this.state.sizeListActive });
  }
  dropDown(listName) {
    this.setState({ [listName]: !this.state[listName] });
  }

  render() {
    // this.props.applyFilter("e");

    //getting products category attributes object and make array of ites key vales
    const data = this.props.data;
    const filterData = Object.keys(data);
    let attributes;
    // console.log(filterData, "from attributes components");
    //for every atrributes type render different output dynamically
    try {
      attributes = filterData.map((atr) => {
        switch (atr) {
          case "Color":
            return (
              <RadioButton
                key={atr}
                atr={atr}
                items={data[atr].items}
                reset={this.props.reset}
                addFilter={this.props.addFilter}
                resetFunction={this.props.resetFunction}
              />
            );
          case "Size":
            return (
              <SelectList
                reset={this.props.reset}
                resetFunction={this.props.resetFunction}
                key={atr}
                atr={atr}
                items={data[atr].items}
                addFilter={this.props.addFilter}
              />
            );

          case "Capacity":
            return (
              <SelectList
                reset={this.props.reset}
                resetFunction={this.props.resetFunction}
                key={atr}
                atr={atr}
                items={data[atr].items}
                addFilter={this.props.addFilter}
              />
            );
          case "Touch ID in keyboard":
            return (
              <CheckBox
              reset={this.props.reset}
              resetFunction={this.props.resetFunction}
                key={atr}
                atr={atr}
                items={data[atr].items}
                addFilter={this.props.addFilter}
              />
            );

          case "With USB 3 ports":
            return (
              <CheckBox
              reset={this.props.reset}
              resetFunction={this.props.resetFunction}
                key={atr}
                atr={atr}
                items={data[atr].items}
                addFilter={this.props.addFilter}
              />
            );

          default:
            return null;
        }
      });
    } catch (error) {
      attributes = [];

      console.log(`error happend  in Attributes component`);
      console.error(error);
    }

    return <div className="filterContent">{attributes}</div>;
  }
}





