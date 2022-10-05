import React, { Component } from "react";

class FiltersList extends Component {
  render() {
    //filtering attrubutes from all products in category
    let productsAtrributes = this.props.products?.map((i) => {
      return i.attributes[0];
    });
    productsAtrributes = productsAtrributes?.filter((i) => i !== undefined);

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
      console.log(i, "inside for loop of uniqueAtr");
      let thisName = i.name;
      let thisAtr = i.atr.map((i) => i.value);

      if (!uniqueAtr[thisName]) {
        uniqueAtr[thisName] = { name: thisName, items: thisAtr };
      }

      // filtering dublicated arttibutes
      // else{ uniqueAtr[thisName]=   [...new Set(uniqueAtr[thisName].atr.concat(thisAtr)) ] }
    }

    console.log(allAtr, "atr");
    console.log(uniqueAtr, "unique");

    // const values= attributes?.map((i) => i.items);
    console.log(productsAtrributes, "products  attributess");

    //console.log(attributes, "All atrributes");
    // console.log(values, "the valuues");

    //console.log(this.props.products, "list props");
    return (
      <>
        <div>list items go theree</div>
        <Attributes data={uniqueAtr} />
      </>
    );
  }
}

export default FiltersList;

class Attributes extends Component {
  render() {
    //getting products category attributes object and make array of ites key vales
    const data = this.props.data;
    const filterData = Object.keys(data);
    let attributes;
    console.log(filterData,"from attributes components")
    //for every atrributes type render different output dynamically
    try {
      attributes = filterData.map((atr) => {
        switch (atr) {
          case "Size":
            return (
              <div key={atr}>
                <h5>{atr}</h5>

                <div className="atributes">
                  {data[atr].items.map((item) => (
                    <div key={item}>
                      <input
                        type="radio"
                        id={item}
                        name={atr}
                        value={item}
                        // onChange={(e) => this.changeAttribute(e, atr)}
                      />
                      <label htmlFor={item}> {item}</label>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>

                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.value + "1"}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.value + "1"}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            return <p key={atr}>"not found "</p>;
        }
      });
    } catch (error) {
      attributes = [];

      console.log(`error happend  in Attributes component`)
      console.error(error)
    }

    return <div>
      
      this attribtes component
      {attributes}</div>;
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
