import React, { Component } from "react";

class FiltersList extends Component {

 
  render() {
    //filtering attrubutes from all products in category
    let productsAtrributes = this.props.products?.map((i) => ( i.attributes.map(i=>i)));
    productsAtrributes=productsAtrributes.reduce((a,b)=>a.concat(b),[] )

    //productsAtrributes = productsAtrributes?.filter((i) => i !== undefined);
    console.log(productsAtrributes,"this is the first step in filtering")
    // grouping  all atributes based on the name of it, ignoring  which products it belongs to
    let allAtr = [];
    for (let i of productsAtrributes) {
      let atr = i?.items;
      let id = i?.id;
      //if (id in allAtr)
      allAtr = allAtr.concat({ name: id, atr: atr });
    }
    // removes dublicates attribtes that comes from different products
    let uniqueAtr = {};
    for (let i of allAtr) {
    //  console.log(i, "inside for loop of uniqueAtr");
      let thisName = i.name;
      let thisAtr = i.atr.map((i) => i.value);

      if (!uniqueAtr[thisName]) {
        uniqueAtr[thisName] = { name: thisName, items: thisAtr };
      }

      // filtering dublicated arttibutes
    //   else{ uniqueAtr[thisName]=   [...new Set(uniqueAtr[thisName].items.concat(thisAtr)) ] }
    }

    console.log(allAtr, "atr");
    console.log(uniqueAtr, "unique");

    // const values= attributes?.map((i) => i.items);
    console.log(productsAtrributes, "products  attributess");

    //console.log(attributes, "All atrributes");
    // console.log(values, "the valuues");

    //console.log(this.props.products, "list props");
    return (
      <div>
        <h5>Filters</h5>

        <Attributes data={uniqueAtr} />
      </div>
    );
  }
}

export default FiltersList;

class Attributes extends Component {
  state={
    "sizeListActive":false,
    "capacityList":false
  }
  sizeDropDown(){
    this.setState({sizeListActive:!this.state.sizeListActive })
    console.log("clicked on size list")
  }
  dropDown(listName){
    this.setState({[listName]:!this.state[listName] })
    console.log("clicked on size list")
  }

  render() {
    //getting products category attributes object and make array of ites key vales
    const data = this.props.data;
    const filterData = Object.keys(data);
    let attributes;
    console.log(filterData, "from attributes components");
    //for every atrributes type render different output dynamically
    const{sizeListActive,capacityList}=this.state
    try {
      attributes = filterData.map((atr) => {
        switch (atr) {
          case "Size":
            return (
              <div key={atr} >
                <div className="atributes">
                  <div onClick={()=>(this.sizeDropDown())}>{atr}⌄</div>
                  <div className ={ `selectListDropdown  ${sizeListActive&&"activeList"}`  }  >

                  {<SelectList attribute={atr} items={data[atr].items} />}

                  </div>
                </div>
              </div>
            );

            case "Capacity":
              return (
                <div key={atr} >
                  <div className="atributes">
                    <div onClick={()=>(this.dropDown("capacityList"))}>{atr}⌄</div>
                    <div className ={ `selectListDropdown  ${capacityList&&"activeList"}`  }  >
  
                    {<SelectList attribute={atr} items={data[atr].items} />}
  
                    </div>
                  </div>
                </div>
              );
              case "Touch ID in keyboard":
                return (
                  <div key={atr}>
                    <h5>{atr}</h5>
    
                    <div className="atributes">
                      {data[atr].items.map((i) => (
                        <div key={i.id}>
                          <input
                            type="radio"
                            id={i+ "1"}
                            name={atr}
                            value={i}
                          />
                          <label htmlFor={i + "1"}> {i}</label>
                        </div>
                      ))}
                    </div>
                  </div>
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

    return (
    <div className="filterContent">{attributes}</div>
    );
  }
}

class SelectList extends Component {
  toggleSelection(e) {
    console.log(e.target.value, "have been clicked");
  }

  render() {
    const { attribute, items } = this.props;
    return (
      <div className="selectList">
        {items.map((i) => (
          <button onClick={(e) => this.toggleSelection(e)} value={i}>
            {i}
          </button>
        ))}
      </div>
    );
  }
}
/*


          case "Capacity":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "Color":
            return (
              <div key={atr.name}>
                <h5>
                  {atr.name} : <span className="gray">{this.state.color}</span>
                </h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label
                        id="color-input"
                        style={{ backgroundColor: i.value }}
                        htmlFor={i.id}></label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "With USB 3 ports":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "Touch ID in keyboard":
*/
