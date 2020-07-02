import React, { useState } from 'react'
import Hammer from "react-hammerjs"
import './registroPet.scss'
import api from '../Db/Db'
import { UserCtxHOC } from '../../components/context/UserCtx'

const RegistroPet = ({ state, ...props }) => <Registro state={state} />

const cardsPattern = [{
    img: 'cachorro',
    nasc: 'Nascimento',
    nome: 'Nome',
    porte: 'Porte',
    situacao: 'Situacao'
}]

const parseAge = birthday => {
    const initial_year = 1970
    const dob = new Date(birthday)
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    const Years = age_dt.getFullYear() - initial_year
    const months = age_dt.getMonth()
    const Days = age_dt.getDate()

    return `${Years} ano${Years > 1 ? 's' : ''}, ${months} ${months > 1 ? 'meses' : 'mês'} e ${Days} dia${Days > 1 ? 's' : ''}`
}

const Registro = ({ state: { userData } }) => {
    const initialDegree = 2
    const rotateInc = 32
    const carrouselLen = 3
    const [cards, setCards] = useState(cardsPattern)
    const maxSwipes = cards.length - carrouselLen - 1
    const [page, setPage] = useState(0)
    const [rotationGrid, setRotationGrid] = useState(initialDegree) // degree rotate
    const [selectedGrid, setSelectedGrid] = useState(0) // Element at center
    const [appointments, setAppointments] = useState({})
    const [PetInfo, setPetInfo] = useState({
        nasc: 'DD/MM/AAAA',
        nome: 'Scooby',
        porte: 'pequeno/medio/grande',
        situacao: 'saudável',
        especie: 'cachorro',
        consulta: 'Agende sua consulta'
    })

    React.useEffect(() => {
        if (userData['_id']) {
            api.getPetAppointment(userData['_id']).then(appointments => {
                setAppointments(appointments)
            })
            setCards([...parsePets(userData.Animais), ...parsePets(userData.Animais)])
            const petInfo = parsePets(
                [userData.Animais[selectedGrid]])[0]
            setPetInfo({
                ...petInfo,
                consulta: 'Carregando'
            })
        }

    }, [userData])

    React.useEffect(_ => {
        if (userData['_id']) {
            console.log(PetInfo.nome)
            const petInfo = parsePets(
                [userData.Animais[selectedGrid % 2]]
            )[0]
            setPetInfo({
                ...petInfo,
                consulta: appointments[petInfo.nome] ? new Date(appointments[petInfo.nome].Data).toLocaleDateString('pt-BR') 
                : appointments.len ? 'Nenhuma consulta' : 'Carregando'
            })
        }

    }, [selectedGrid, appointments])

    const RotateLeft = _ => {
        if (rotationGrid < -initialDegree) {
            setRotationGrid(rotationGrid + rotateInc)
            setSelectedGrid(page)
            setPage(page - 1)
        }
    }

    const RotateRight = _ => {
        if (rotationGrid > -(rotateInc * maxSwipes)) {
            setRotationGrid(rotationGrid - rotateInc)
            setSelectedGrid(page + carrouselLen - 1)
            setPage(page + 1)
        }
    }

    const parsePets = Animals => Animals.map(
        a => ({
            img: a['Especie'],
            nasc: a['Nascimento'],
            nome: a['Nome'],
            porte: a['Porte'],
            situacao: a['Situacao']
        })
    )

    const handleClick = idx => {
        setSelectedGrid(idx)
    }

    const generateCards = (cards, selectedGrid) => cards.map(
        (card, i) => (
            <div className="pet-card" key={card + i}
                onClick={_ => handleClick(i)}
                style={i === selectedGrid ? { height: '200px' } : {}}>
                <img src={require(`./Pets/${card.img}.jpg`)} alt="Imagem de um coelho" id="coelho" />
            </div>
        )
    )

    return (
        <section id="registro-section">
            <div id="registro-section-container">

                <div className="selecionar-pet">
                    <div id="titulo">
                        <h1> Selecione seu pet </h1>
                    </div>
                    <div className="Promotions-cards-container">
                        <div className="Promotions-cards-wrapper">
                            <i className="material-icons seta-parc" style={{ fontSize: '200%' }}
                                onClick={RotateLeft}
                            >keyboard_arrow_left</i>
                            <div className="carrousel-box"
                                style={cards.length <= 2 ? { width: '50%' } : {}}>
                                <Hammer
                                    onSwipeRight={RotateLeft} onSwipeLeft={RotateRight} >
                                    {/* 32% rotaion */}
                                    <div className="promotions-carrousel"
                                        style={{
                                            transform: `translateX(${rotationGrid}%`,
                                            ...(cards.length <= 2 ? { justifyContent: 'center' } : {})
                                        }}>
                                        {generateCards(cards, selectedGrid)}
                                    </div>
                                </Hammer>
                            </div>

                            <i className="material-icons seta-parc"
                                style={{ fontSize: '200%' }}
                                onClick={RotateRight}
                            >keyboard_arrow_right</i>
                        </div>
                    </div>

                </div>

                <div className="dados">
                    <div className="info-pet">
                        <div id="titulo"> <h1> Informações do Pet </h1> </div>
                        <div id="info">
                            <div> Nome: {PetInfo.nome} </div>
                            <div> Idade: {parseAge(PetInfo.nasc)}</div>
                            <div> Tipo: {PetInfo.img} </div>
                        </div>
                    </div>

                    <div className="status-pet">
                        <h3> Próxima Consulta:  {PetInfo.consulta}</h3>
                        <ul>
                            <li id="situacao-atual"> Situação Atual: {PetInfo.situacao}</li>
                        </ul>
                    </div>
                </div>

                <div className="registrar-btn">
                    <button> Registrar novo Pet </button>
                    <hr />
                </div>

            </div>
        </section >
    )
}

export default UserCtxHOC(RegistroPet)