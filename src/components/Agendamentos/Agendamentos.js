import React from 'react'
import Calendar from '../Calendar/Calendar'
import './Agendamentos.scss'

const Agendamento = ({ title, changeFather }) => {
    React.useEffect(_ => {
        console.log(changeFather)
        changeFather("calendar")
    })
    const [date, setDate] = React.useState("Selecione uma data")
    const [hour, setHour] = React.useState("HH:MM")
    const [petName, setPetName] = React.useState("nome")
    const [reason, setReason] = React.useState("Motivo da visita")
    return (
        <div className="agendamento-container">
            <Calendar />

            <div className="agendamento-info">
                <div className="click-info">
                    <h4>Data agendada: {date}</h4>
                    <h4>Horário: {hour}</h4>
                    <h4>Nome do pet: {petName}</h4>
                    <h4>Motivo: {reason}</h4>
                </div>
                <div className="btn-add-container">
                    <button className="btn-add">Fazer novo agendamento</button>
                </div>
            </div>
        </div>
    )
}

export default Agendamento