import React from 'react';
import Topbar from '../../components/TopBar/TopBar';
import ProductMenu from '../../components/ProductMenu/ProductMenu'
import Footer from '../../components/Footer/Footer'

const HomePage = props => {
    // const [] =  get url params

    return (
        <div className={"App"}>
            <Topbar />

            <ProductMenu title="Acessórios" />
            <Footer />
        </div>
    )
}

export default HomePage;

