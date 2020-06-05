import React from 'react'
import './Promotions.scss'
import Hammer from "react-hammerjs"
import { useState } from 'react'

const cards = [{
    title: "Banho e tosa 1",
    message: "O tratamento perfeito para um pelo bonito e sedoso.",
    price: "A partir de R$ 50,00",
    btn: "Comprar",
    link: "/"
}, {
    title: "Banho e tosa 2",
    message: "Seu bichinho merece só as melhores guloseimas.",
    price: "A partir de R$ 5,00",
    btn: "Comprar",
    link: "/"
}, {
    title: "Banho e tosa 3",
    message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
    price: "Para todos os produtos",
    btn: "Comprar",
    link: "/"
},
{
    title: "Banho e tosa 4",
    message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
    price: "Para todos os produtos",
    btn: "Comprar",
    link: "/"
},
{
    title: "Banho e tosa 5",
    message: "Compre um novo brinquedo para seu pet e leve outro de brinde.",
    price: "Para todos os produtos",
    btn: "Comprar",
    link: "/"
}]

const Promotions = props => {
    const initialDegree = 2
    const rotateInc = 32
    const carrouselLen = 3
    const maxSwipes = cards.length - carrouselLen - 1
    const [rotationGrid, setRotationGrid] = useState(initialDegree) // degree rotate
    const [selectedGrid, setSelectedGrid] = useState(1) // Element at center   


    const RotateLeft = _ => {
        if (rotationGrid < -initialDegree) {
            setRotationGrid(rotationGrid + rotateInc)
            setSelectedGrid(selectedGrid - 1)
        }
    }

    const RotateRight = _ => {
        if (rotationGrid > -(rotateInc * maxSwipes)) {
            setRotationGrid(rotationGrid - rotateInc)
            setSelectedGrid(selectedGrid + 1)
        }
    }
    return (
        <div className="Promotions-container">
            <div className="Promotions-wrapper">
                <h1>Promoções</h1>
                <div className="Promotions-cards-container">
                    <div className="Promotions-cards-wrapper">
                        <i className="material-icons seta-parc" style={{ fontSize: '200%' }}
                            onClick={RotateLeft}
                        >keyboard_arrow_left</i>
                        <div className="carrousel-box">
                            <Hammer
                                onSwipeRight={RotateLeft} onSwipeLeft={RotateRight} >
                                {/* 32% rotaion */}
                                <div className="promotions-carrousel" style={{ transform: `translateX(${rotationGrid}%` }}>
                                    {generateCards(cards, selectedGrid)}
                                </div>
                            </Hammer>
                        </div>

                        <i
                            className="material-icons seta-parc"
                            style={{ fontSize: '200%' }}
                            onClick={RotateRight}
                        >keyboard_arrow_right</i>
                    </div>
                </div>
            </div>

        </div>
    )
}

const generateCards = (cards, selectedGrid) => cards.map(
    (card, i) => (
        <div className="p-card" key={card + i} style={i === selectedGrid ? { height: '350px' } : {}}>
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
)

export default Promotions