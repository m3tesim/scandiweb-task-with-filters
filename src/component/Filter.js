import React, { Component } from "react";
import SelectList from "./selectList";

export const FilterContext = React.createContext();

class Filters extends Component {
  state = {
    filters: {},
    reset: false,
  };
  reset=(value)=> {

    console.log("this.state after reset from selects is on ");

    this.setState({ reset: value });
  }

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
      filters: [],
      reset: value 
    });
    console.log("clicked");
    this.props.history.push({
      pathname: "/",
      search: null,
    });
    this.reset(value)
  };

  
  render() {
    let atributes = getAttributes(this.props.products);
    return (
      <div className="filtersContainer">
        <div className="filtersTitle">Filters</div>
        <FilterContext.Provider
        value={{"reset":this.reset,"active":this.state.reset}}
        >
        <Attributes reset={this.state.reset} data={atributes} addFilter={this.addFilter}  resetFunction={this.reset}/>
        </FilterContext.Provider>
        <div>
          {" "}
          <button className="btn" onClick={() => (this.resetFilters(true))}>
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
            return <RadioButton key={atr} atr={atr} items={data[atr].items} />;
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
                key={atr}
                atr={atr}
                items={data[atr].items}
                addFilter={this.props.addFilter}
              />
            );

          case "With USB 3 ports":
            return (
              <CheckBox
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

class RadioButton extends Component {
  render() {
    const { atr, items } = this.props;

    return (
      <div key={atr}>
        <div className="filterAtributes" style={{ gap: ".1rem" }}>
          <div>{atr}</div>
          <br />
          {items.map((i) => (
            <div key={i}>
              <input type="radio" id={i} name={atr} value={i} />
              <label
                id="color-input"
                style={{ backgroundColor: i }}
                htmlFor={i}></label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class CheckBox extends Component {
  render() {
    const { atr, items, addFilter } = this.props;

    const toggleSelection = (e) => {
      let checked = e.target.checked;
      const item = e.target.value;
      checked ? addFilter(atr, item) : addFilter(atr, item, true);

      //applyFilter();
    };
    return (
      <div key={atr}>
        <div className="filterAtributes ">
          <div>{atr}</div>

          <div className="checkBoxContainer">
            {items.map((i,index) => (
              <div key={i+atr}>
                <input
                  type="checkbox"
                  id={i+atr}
                  name={i}
                  value={i}
                  onClick={(e) => toggleSelection(e)}
                />
                <label htmlFor={i}> {i}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export function getAttributes(products) {
  //filtering attrubutes from all products in category
  let productsAtrributes = products?.map((i) => i.attributes.map((i) => i));
  productsAtrributes = productsAtrributes.reduce((a, b) => a.concat(b), []);

  // grouping  all atributes based on the name of it, ignoring  which products it belongs to
  let allAtr = [];
  for (let i of productsAtrributes) {
    let atr = i?.items;
    let id = i?.id;
    allAtr = allAtr.concat({ name: id, atr: atr });
  }
  // removes dublicates attribtes that comes from different products
  let uniqueAtr = {};
  for (let i of allAtr) {
    let thisName = i.name;
    let thisAtr = i.atr.map((i) => i.value);

    if (!uniqueAtr[thisName]) {
      uniqueAtr[thisName] = { name: thisName, items: thisAtr };
    }

    // filtering dublicated arttibutes
    //   else{ uniqueAtr[thisName]=   [...new Set(uniqueAtr[thisName].items.concat(thisAtr)) ] }
  }

  return uniqueAtr;
}
