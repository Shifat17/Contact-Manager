import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AddContacts from "./components/contacts/AddContacts";
import Contacts from "./components/contacts/Contacts";
import About from "./components/pages/About";
import { Provider } from "./context";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import EditContact from "./components/contacts/EditContact";
import NotFound from "./components/pages/NotFound";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Mangaer" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContacts} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
