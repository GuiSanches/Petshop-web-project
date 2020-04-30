import React from 'react';
import './TopBar.scss';
import logo from '../../Images/logo.png'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchProduct from '../SearchProduct/SearchProduct'

const TopBar = () => {
  return (
    <header id="h-index">
      <nav className="topbar">
        <div className="nav-left">
          {/* <FontAwesomeIcon icon={faBars} /> */}
          <a href="/" className="topbar-logo">
            <img src={logo} className="logo" alt="logo" />
          </a>
        </div>
        <div className="topbar-wrapper">
          <div className="nav-right">
            <SearchProduct />
            <NavItens />
          </div>
        </div>
      </nav>
    </header>
  );
}

const NavItens = _ => {
  const NavItens = [
    {
      link: '/consulta',
      content: 'Agendar Consulta'
    },
    {
      link: '/pedidos',
      content: 'Meus Pedidos'
    },
    {
      link: '/account/login',
      content: 'Minha Conta'
    },
  ]

  return (
    <div key={1} className="nav-actions">
      {NavItens.map((sessionItem, i) => <NavItem key={'nav-i_' + i} {...sessionItem} />)}
    </div>
  )
}

const NavItem = props => {
  return (
    <div className="nav-item">
      <a href={props.link}>{props.content}</a>
    </div>
  )
}

export default TopBar;
