import React from 'react';
import './styles/App.css';
import {Route} from 'react-router-dom';
import Home from "../src/pages/Home";
import Events from "../src/pages/Events";
import RSOs from "../src/pages/RSOs";
import EventApprovals from "../src/pages/EventApprovals";
import RSOApprovals from "../src/pages/RSOApprovals";
import RequestEvent from "../src/pages/RequestEvent";
import RequestRSO from "../src/pages/RequestRSO";
import Event from "../src/pages/Event";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/events" exact component={Events} />
      <Route path="/rsos" exact component={RSOs} />
      <Route path="/eventApprovals" exact component={EventApprovals} />
      <Route path="/rsoApprovals" exact component={RSOApprovals} />
      <Route path="/requestEvent" exact component={RequestEvent} />
      <Route path="/requestRSO" exact component={RequestRSO} />
      <Route path="/event" exact component={Event} />
    </div>
  );
}

export default App;
