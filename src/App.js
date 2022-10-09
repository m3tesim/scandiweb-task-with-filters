import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Switch } from "react-router-dom";
import ProductPage from "./component/productPage";
import Cart from "./component/cart";
import Nav from "./component/nav";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="app-container">
        <div className="App">
          {loading === true ? null : (
            <Route  path="/" render={(props) => <Nav {...props} />} />
          )}

          <Switch>
          
            {loading === true ? null : (
              <Route
                path="/product/:id"
                render={(props) => {
                  const {
                    match: {
                      params: { id },
                    },
                  } = props;

                  return <ProductPage key={`id=${id}`} {...props} />;
                }}
              />
            )}

            <Route path="/cart" component={Cart}></Route>

            {loading === true ? null : (
              <Route
                
                path="/"
                render={(props) => <DashBoard {...props} />}
              />
            )}

          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ currencies, categories, products }) {
  return {
    loading: currencies === null,
    categories,
  };
}
