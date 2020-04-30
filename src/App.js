import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import PerfilPage from './Pages/Perfil/Perfil'
import LayoutAccount from './Pages/LayoutAccount/LayoutAccount'
import CadastroPage from './Pages/Cadastro/Cadastro'
import { UserContext } from './components/context/UserCtx'
import ProductPage from './Pages/Products/Products'
// import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Switch>
      <UserContext>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/account*" component={LayoutAccount} />
        <Route exact path="/perfil" component={PerfilPage} />
        <Route exact path="/produtos" component={ProductPage} />
      </UserContext>
    </Switch>

  );
}

export default App;
