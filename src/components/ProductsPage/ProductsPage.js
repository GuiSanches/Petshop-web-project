import React from 'react';
import './ProductsPage.css';
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsLeftMenu from '../ProductsLeftMenu/ProductsLeftMenu'

const ProductsPage = () => {
    return (
        <div className="Product-container">
            <ProductsLeftMenu />
        </div>
    );
}

export default ProductsPage;
