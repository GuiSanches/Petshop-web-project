import React from 'react'
import './Promotions.scss'

const Promotions = props => {
    const cards = [{
        title: "Banho e tosa",
        message: "O tratamento perfeito para um pelo bonito e sedoso.",
        price: "A partir de R$ 50,00",
        btn: "Comprar",
        link: "/"
    }, {
        title: "Banho e tosa",
        message: "Seu bichinho merece só as melhores guloseimas.",
        price: "A partir de R$ 5,00",
        btn: "Comprar",
        link: "/"
    }, {
        title: "Banho e tosa",
        message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
        price: "Para todos os produtos",
        btn: "Comprar",
        link: "/"
    },
    {
        title: "Banho e tosa",
        message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
        price: "Para todos os produtos",
        btn: "Comprar",
        link: "/"
    },
    {
        title: "Banho e tosa",
        message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
        price: "Para todos os produtos",
        btn: "Comprar",
        link: "/"
    }]

    const generateCards = (cards) => {
        return cards.map((card,i) => {
            return (
                <div className="p-card" key={card + i}>
                    <div className="p-card-wrap">
                        <h3 className="p-card-title">{card.title}</h3>
                        <div className="p-card-content">
                            <div className="img"></div>
                            <p>{card.message}</p>
                            <p>{card.price}</p>
                        </div>
                        <a className="p-card-link" href={card.link}>{card.btn}</a>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="Promotions-container">
            <div className="Promotions-wrapper">
                <h1>Promoções</h1>
                <div className="Promotions-cards-container">
                    <div className="Promotions-cards-wrapper">
                        <i className="material-icons seta-parc" style={{ fontSize: '200%' }}>keyboard_arrow_left</i>
                        <div className="carrousel-box">
                            {/* 32% rotaion */}
                            <div className="promotions-carrousel" style={{ transform: 'translateX(2%' }}>
                                {generateCards(cards)}
                            </div>
                        </div>
                        <i className="material-icons seta-parc" style={{ fontSize: '200%' }}>keyboard_arrow_right</i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Promotions