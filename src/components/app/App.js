import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../../assets/images/Ekonomentesolutions-removebg-preview___serialized1.png'; // Ensure correct logo path
import './App.css';
import Konsulter from '../konsulter/Konsulter';
import Managers from '../managers/Managers';
import Home from '../home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/managers">View All Managers</Link></li>
            <li><Link to="/konsulter">View All Consultants</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/managers" component={Managers} />
          <Route exact path="/konsulter" component={Konsulter} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
