import React, { Component } from "react";

class FiltersList extends Component {
  applyFilter = (atribute) => {
    // this.props.dispatch(getProducts(products));
    // this.setState({ active: category });
  };

  render() {
    let atributes = getAttributes(this.props.products);

    return (
      <div className="filtersContainer">
        <div className="filtersTitle">Filters</div>
        <Attributes data={atributes} applyFilter={this.applyFilter} />
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
    //getting products category attributes object and make array of ites key vales
    const data = this.props.data;
    const { applyFilter } = this.props;
    const filterData = Object.keys(data);
    let attributes;
    // console.log(filterData, "from attributes components");
    //for every atrributes type render different output dynamically
    try {
      attributes = filterData.map((atr) => {
        switch (atr) {
          case "Color":
            return <RadioButton atr={atr} items={data[atr].items} />;
          case "Size":
            return (
              <SelectList
                atr={atr}
                items={data[atr].items}
                applyFilter={applyFilter}
              />
            );

          case "Capacity":
            return <SelectList atr={atr} items={data[atr].items} />;
          case "Touch ID in keyboard":
            return <CheckBox atr={atr} items={data[atr].items} />;

          case "With USB 3 ports":
            return <CheckBox atr={atr} items={data[atr].items} />;

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

class SelectList extends Component {
  state = {
    active: false,
  };
  dropDown() {
    this.setState({ active: !this.state.active });
    console.log("clicked on  list");
  }

  toggleSelection(e) {
    console.log(e.target.value, "have been clicked");
  }

  render() {
    const { atr, items } = this.props;
    return (
      <div className="filterAtributes">
        <div onClick={() => this.dropDown()}>{atr}⌄</div>
        <div
          className={`selectListDropdown  ${
            this.state.active && "activeList"
          }`}>
          <div className="selectList">
            {items.map((i) => (
              <Button item={i} toggleSelection={this.toggleSelection} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
class Button extends Component {
  state = { active: false };
  clicked = (e) => {
    this.setState({
      active: !this.state.active,
    });
    this.props.toggleSelection(e);
  };

  render() {
    console.log(this.state.active);

    const { item } = this.props;

    return (
      <button
        className={`${this.state.active && "activeListItem"}`}
        key={item}
        onClick={(e) => this.clicked(e)}
        value={item}>
        {item}
      </button>
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
