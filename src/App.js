import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Topbar from './components/TopBar/TopBar';
import ProductsPage from './components/ProductsPage/ProductsPage'
// import Footer from './components/Footer/Footer'

const App = () => {  
  return (
    <div className={"App"}> 
    <Topbar />
    <ProductsPage />
    {/* <Footer /> */}
    </div>
  );
}

export default App;
