import React from 'react'
import Calendar from '../Calendar/Calendar'
import './Agendamentos.scss'

const Agendamento = ({ title, changeFather }) => {
    React.useEffect(_ => {
        changeFather("calendar")
    })
    const [date, setDate] = React.useState("Selecione uma data")
    const [hour, setHour] = React.useState("HH:MM")
    const [petName, setPetName] = React.useState("nome")
    const [reason, setReason] = React.useState("Motivo da visita")

    const handleBook = bookData => {
        const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
        const prependZero = number => number < 9 ? `0${number}` : number
        const {day, month, year, hour, min} = bookData
        setDate(`${day} de ${months[month]}, ${year}`)
        setHour(`${prependZero(hour)}:${prependZero(min)}`)
    }

    const handleInputChange = (set_, event) => {
        set_(event.target.value)
    }

    const handleClick = _ => {
        // submitBook({date, hour, petName, reason})
        // setRealod(true)
        alert("Consulta agendada com sucesso")
    }
    return (
        <div className="agendamento-container">
            <Calendar handleBook={handleBook} />

            <div className="agendamento-info">
                <div className="click-info">
                    <h4>Data agendada: {date}</h4>
                    <h4>Horário: {hour}</h4>
                    <h4>Nome do pet: <input className="bookInput" onChange={event => handleInputChange(setPetName, event)} value={petName}/></h4>
                    <h4>Motivo: <input className="bookInput" onChange={event => handleInputChange(setReason, event)} value={reason} /></h4>
                </div>
                <div className="btn-add-container">
                    <button className="btn-add" onClick={handleClick}>Confirmar novo agendamento</button>
                </div>
            </div>
        </div>
    )
}

export default Agendamento