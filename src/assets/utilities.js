export function getAttributes(products) {
  //filtering attrubutes from all products in category
  let productsAtrributes = products?.map((i) => i.attributes.map((i) => i));
  productsAtrributes = productsAtrributes.reduce((a, b) => a.concat(b), []);

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
}

export function filterProducts(products, params) {
  let filteredProducts = [];
   let NoPoductFound=false
  for (let product of products) {
    let productAtr = getAttribute(product);
    let showProduct=true ;
console.log(productAtr,"product attributes inside filter function");
    params.forEach((value, key) => {
      console.log(productAtr[`${key}`]);

      if (productAtr[`${key}`] === undefined) showProduct = false;
    });

    if (showProduct) filteredProducts.push(product);
  }

  return filteredProducts;
}

const getAttribute = (product) => {
  //filtering attrubutes from all products in category
  let attributes = product.attributes;
  let obj = {};
  for (let atr of attributes) {
    obj[atr.id] = atr.id;
  }
  return obj;
};
