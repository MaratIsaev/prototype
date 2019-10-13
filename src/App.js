import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import CustomersPage from "containers/customersPage";
import "./assets/theme/all.css";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <CustomersPage />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
