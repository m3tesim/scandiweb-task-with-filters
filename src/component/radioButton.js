import React, { Component } from "react";



export class RadioButton extends Component {

  checkedRef = React.createRef();
    componentDidUpdate(prevProps,prevState){
        // this checks for the reset value that passed from filter parent and based on it 
        if (prevProps.reset !== this.props.reset&& this.props.reset===true) {
          this.checkedRef.current.map((element) => (element.checked = false));
        }
      }

    render() {
      this.checkedRef.current=[]

      const { atr, items,resetFunction, addFilter } = this.props;
      const toggleSelection = (e) => {
       // console.log(e.target.value, "have been clicked");
        const item = e.target.value;
        resetFunction(false);
        addFilter(atr, item);
      };

     // console.log(this.checkedRef,"Refer ftom radio button");
      return (
        <div key={atr}>
          <div className="filterAtributes" style={{ gap: ".1rem" }}>
            <div>{atr}</div>
            <br />
            {items.map((i,index) => (
              <div key={i}>
                <input
                  ref={(element) => {
                 this.checkedRef.current[index] = element;
                  }}
                  type="radio"
                  id={i}
                  name={atr}
                  value={i}
                  onClick={(e) => toggleSelection(e)}
                />
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