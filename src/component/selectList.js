import React, { Component } from "react";

class SelectList extends Component {
  state = {
    active: false,
    selectedItems: [],
  };
  dropDown() {
    this.setState({ active: !this.state.active });
    console.log("clicked on  list");
  }

  render() {
    console.log(
      "------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA-------------------------"
    );

    const { atr, items, applyFilter } = this.props;
    const { selectedItems } = this.state;

    const toggleSelection = (e) => {
      console.log(e.target.value, "have been clicked");
      const item = e.target.value;
      
      if (selectedItems.indexOf(item) === -1) {
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



    };

    console.log(selectedItems, "selected items ");

    console.log(
      "---------------------------bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-------------"
    );

    return (
      <div className="filterAtributes">
        <div onClick={() => this.dropDown()}>{atr}⌄</div>
        <div
          className={`selectListDropdown  ${
            this.state.active && "activeList"
          }`}>
          <div className="selectList">
            {items.map((i) => (
              <Button
                key={i}
                item={i}
                toggleSelection={(e) => toggleSelection(e)}
              />
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

export default SelectList;
