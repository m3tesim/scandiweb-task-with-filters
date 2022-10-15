
import React, { Component } from "react";



class CheckBox extends Component {

    checkedRef = React.createRef();
      componentDidUpdate(prevProps,prevState){
          // this checks for the reset value that passed from filter parent and based on it 
          if (prevProps.reset !== this.props.reset&& this.props.reset===true) {
            this.checkedRef.current.map((element) => (element.checked = false));
          }
        }
  
    render() {
      this.checkedRef.current=[]
  
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
              {items.map((i, index) => (
                <div key={i + atr}>
                  <input
                    ref={(element) => {
                      this.checkedRef.current[index] = element;
                       }}
                    type="checkbox"
                    id={i + atr}
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


  export default CheckBox;