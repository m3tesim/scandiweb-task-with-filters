import React, { Component } from "react";

class SelectList extends Component {
  state = {
    active: false,
    value: null,
  };
  dropDown() {
    this.setState({ active: !this.state.active });
    console.log("clicked on  list");
  }

  render() {
    console.log(
      "------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA-------------------------"
    );

    const { atr, items ,addFilter} = this.props;

    const toggleSelection = (e) => {
      console.log(e.target.value, "have been clicked");
      const item = e.target.value;
      this.setState({
        value: item,
        active: !this.state.active
      });
       addFilter(atr,item)
      //applyFilter();

      /*  if (selectedItems.indexOf(item) === -1) {
        applyFilter(atr, [...selectedItems, item]);

        this.setState({
          selectedItems: [...selectedItems, item],
        });
      } else {
        const arr = selectedItems.filter((i) => i !== item);
        applyFilter(atr, arr);

        this.setState({
          selectedItems: arr,
        });
      }
*/
    };


    console.log(
      "---------------------------bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-------------"
    );

    return (
      <div className="filterAtributes">
        <div onClick={() => this.dropDown()}> {atr} <span className="colorGrean" >{this.state.value}</span>⌄</div>

        <div
          className={`selectListDropdown  ${
            this.state.active && "activeList"
          }`}>
            
          <div className="selectList">
            {items.map((i) => (
              <button
              // className={`${this.state.active && "activeListItem"}`}
               key={i}
               onClick={(e) => toggleSelection(e)}
               value={i}>
               {i}
             </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Button extends Component {
  clicked = (e) => {
    this.props.toggleSelection(e);
  };

  render() {

    const { item } = this.props;

    return (
      <button
       // className={`${this.state.active && "activeListItem"}`}
        key={item}
        onClick={(e) => this.clicked(e)}
        value={item}>
        {item}
      </button>
    );
  }
}

export default SelectList;
