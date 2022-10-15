import React, { Component } from "react";
import { FilterContext } from "./filter";
class SelectList extends Component {
  state = {
    active: false,
    value: null,
  };
  componentDidUpdate(prevProps,prevState){
    // this checks for the reset value that passed from filter parent and based on it 
    //set the value of the select list to null or do nothing
    if (prevProps.reset !== this.props.reset&& this.props.reset===true) {
      this.setState({
        value: null,
      })}
  }

  dropDown() {
    this.setState({ active: !this.state.active });
    console.log("clicked on  list");
  }

  render() {

    const { atr, items ,addFilter,resetFunction} = this.props;

    const toggleSelection = (e) => {
      console.log(e.target.value, "have been clicked");
      const item = e.target.value;
      resetFunction(false)
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
               onClick={(e) => {
                toggleSelection(e)
             
              }}
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


export default SelectList;
