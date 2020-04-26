import React from 'react'
import './Atendimento.scss'

const Atendimento = props => {
    const sessionTitle = "Atendimento"
    const content = "Agende agora mesmo o banho e tosa para o seu pet"
    const cards = [
        {
            name: "Banho",
            price: "30,00",
            btn: "agendar"
        },
        {
            name: "Banho",
            price: "30,00",
            btn: "agendar"
        },
        {
            name: "Banho",
            price: "30,00",
            btn: "agendar"
        }
    ]
    const generateCards = cards => {
        return cards.map(card => {
            return (
                <div className="card-box">
                    <div className="card-round"></div>
                    <div className="card-info">
                        <p>{card.name}</p>
                        <p>R$: {card.price}</p>
                    </div>
                    <a className="card-btn" href="">{card.btn}</a>
                </div>
            )
        })
    }
    return (
        <section className="atendimentos">
            <div className="atendimentos-container">
                <div className="atendimentos-left">
                    <h1 className="title">{sessionTitle}</h1>
                    <p className="content">{content}</p>
                </div>
                <div className="atendimentos-right">
                    {generateCards(cards)}
                </div>
            </div>
        </section>
    )
}

export default Atendimento