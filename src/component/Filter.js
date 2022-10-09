import React, { Component } from "react";
import SelectList from "./selectList";
class FiltersList extends Component {
  state = {
    filters: [],
  };

  render() {
    const params = new URLSearchParams();

    const applyFilter = (atr, items) => {
      // this.setState({ active: category });

      params.append(atr, items);

      //console.log(params.entries,"this is from urlsearch params API")
      //console.log(this.props.history,"history");

      this.props.history.push({
        pathname: "/",
        search: params.toString(), // '?name=John&age=32
      });
      // console.log(this.props.history,"history");
    };

    let atributes = getAttributes(this.props.products);
    return (
      <div className="filtersContainer">
        <div className="filtersTitle">Filters</div>
        <Attributes data={atributes} applyFilter={applyFilter} />
        <div>
          {" "}
          <button className="btn">Reset Filters</button>
        </div>
      </div>
    );
  }
}

export default FiltersList;

class Attributes extends Component {
  state = {
    sizeListActive: false,
    capacityList: false,
  };
  sizeDropDown() {
    this.setState({ sizeListActive: !this.state.sizeListActive });
    console.log("clicked on size list");
  }
  dropDown(listName) {
    console.log("clicked on size list");

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
                key={atr}
                atr={atr}
                items={data[atr].items}
                applyFilter={this.props.applyFilter}
              />
            );

          case "Capacity":
            return (
              <SelectList
                key={atr}
                atr={atr}
                items={data[atr].items}
                applyFilter={this.props.applyFilter}
              />
            );
          case "Touch ID in keyboard":
            return <CheckBox key={atr} atr={atr} items={data[atr].items} />;

          case "With USB 3 ports":
            return <CheckBox key={atr} atr={atr} items={data[atr].items} />;

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
    const { atr, items } = this.props;
    return (
      <div key={atr}>
        <div className="filterAtributes ">
          <div>{atr}</div>

          <div className="checkBoxContainer">
            {items.map((i) => (
              <div key={i}>
                <input type="checkbox" id={i} name={i} value={i} />
                <label htmlFor={i}> {i}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function getAttributes(products) {
  //filtering attrubutes from all products in category
  let productsAtrributes = products?.map((i) => i.attributes.map((i) => i));
  productsAtrributes = productsAtrributes.reduce((a, b) => a.concat(b), []);

  //productsAtrributes = productsAtrributes?.filter((i) => i !== undefined);
  // console.log(productsAtrributes, "this is the first step in filtering");
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
  // console.log(allAtr, "atr");
  // console.log(uniqueAtr, "unique");

  // console.log(productsAtrributes, "products  attributess");
}
