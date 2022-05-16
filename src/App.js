import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import SearchResultsList from "./components/SearchResultList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
  
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/search"]} component={SearchResultsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
