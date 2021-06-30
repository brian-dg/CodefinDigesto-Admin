import React from "react";
import Dashboard from "./Views/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import Login from "./Views/Login/Login";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>  
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
