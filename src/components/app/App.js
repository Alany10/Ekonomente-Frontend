import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../../assets/images/Ekonomentesolutions-removebg-preview___serialized1.png'; // Ensure correct logo path
import './App.css';
import Home from '../home/Home';
import ConsultLogin from '../consults/ConsultLogin';
import ManagerLogin from '../managers/ManagerLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/consult">Consult</Link></li>
            <li><Link to="/manager">Manager</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/consult" component={ConsultLogin} />
          <Route exact path="/manager" component={ManagerLogin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
