import React from 'react';
import './ProductsPage.scss';
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsLeftMenu from '../ProductsLeftMenu/ProductsLeftMenu'
import SectionProduct from '../SectionProduct/SectionProduct'
import SectionBrands from '../SectionBrands/SectionBrands'
import Promotions from '../Promotions/Promotions'
import Atendimento from '../Atendimento/Atendimento'
import Equipe from '../Equipe/Equipe'

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
                <SectionBrands title="Principais marcas"/>
                <SectionProduct {...sessionsContent[0]} />
                <SectionProduct {...sessionsContent[0]} />
            </div>
            <Atendimento />
            <Equipe title="Equipe"/>
        </div>
    );
}

export default ProductsPage;
