import React from 'react';
import Topbar from '../../components/TopBar/TopBar';
import './Cadastro.scss'
import Footer from '../../components/Footer/Footer'
// import { UserCtx } from '../components/context/UserCtx'


const Cadastro = _ => {
    const inputs = [
        {type: 'text', placeholder: 'Nome completo'},
        {type: 'email', placeholder: 'E-mail'},
        {type: 'date', placeholder: 'Data de nascimento'},
        {type: 'text', placeholder: 'Telefone'},
        {type: 'password', placeholder: 'Senha'},
        {type: 'password', placeholder: 'Confirme sua senha'}
    ]

    return (
        <div className="acc-box">
            <div className="acc cadastro">
                <p>Pedrigui's com você de P a I</p>
                <h1>Cadastro</h1>
                <form>
                    {inputs.map(i => <input type={i.type} placeholder={i.placeholder} />)}
                    <div className="form-btn align-center">
                        <a className="btn-acc" type="submit" href="#CRIADA">Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;


