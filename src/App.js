import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router-dom'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
// import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} /> 
      <Route exact path="/login" component={LoginPage} />           
    </Switch>

  );
}

export default App;
