import React from 'react';
import './styles/App.css';
import {Route} from 'react-router-dom';
import Landing from "../src/pages/Landing";
import Home from "../src/pages/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Landing} />
      <Route path="/home" exact component={Home} />
    </div>
  );
}

export default App;
