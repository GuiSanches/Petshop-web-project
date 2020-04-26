import React from 'react';
import './ProductsPage.scss';
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsLeftMenu from '../ProductsLeftMenu/ProductsLeftMenu'
import SectionProduct from '../SectionProduct/SectionProduct'
import Promotions from '../Promotions/Promotions'
import Atendimento from '../Atendimento/Atendimento'

const ProductsPage = () => {
    const cards = Array.from(
        {length: 7},
        () => ({
            title: "Card",
            content: "Rações e biscoitos"
        })
    )
    const sessionsContent = [{
        sessionTitle: "Ofertas para cachorro",
        cards
    }]
    return (
        <div className="Product-container">
            {/* <ProductsLeftMenu /> */}
            <Promotions />
            <div className="section-wrapper">
                <SectionProduct {...sessionsContent[0]} />
                <SectionProduct {...sessionsContent[0]} />
            </div>
            <Atendimento />
        </div>
    );
}

export default ProductsPage;
