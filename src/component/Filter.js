import React, { Component } from "react";


class FiltersList extends Component {
    render() {
      let productsAtrributes = this.props.products?.map(
         (i) => { return i.attributes[0] });
      // productsAtrributes2=this.props.products?.map((i) => (i) );
      productsAtrributes=productsAtrributes.filter(i=>i!==undefined)
  
      // all atributes based on the name of it ignoring  which products it belong to  
       let allAtr=[]
       for ( let i of productsAtrributes){
        let atr=i?.items
        let id=i?.id
        //if (id in allAtr) 
        allAtr= allAtr.concat({ "name":id, "atr": atr })
       } 
       
       let unique={}
       for(let i of allAtr){
        console.log(i,"inside for loop of unique")
        let thisName=i.name
         let thisAtr=i.atr.map(i=>i.value)
        
       if (!unique[thisName]) 
          { unique[thisName]={"name": thisName,"atr":thisAtr} }
  
  
        // filtering dublicated arttibutes
         // else{ unique[thisName]=   [...new Set(unique[thisName].atr.concat(thisAtr)) ] }
       }
  
       
  
      console.log(allAtr, "atr");
      console.log(unique, "unique");
  
  
      // const values= attributes?.map((i) => i.items);
      console.log(productsAtrributes, "products  attributess");
  
      //console.log(attributes, "All atrributes");
      // console.log(values, "the valuues");
  
      //console.log(this.props.products, "list props");
      return (
        <>
          <div>list items go theree</div>
          <ul>
            <li>
                {unique.Size.name}</li>
          </ul>
        </>
      );
    }
  }

  export default FiltersList