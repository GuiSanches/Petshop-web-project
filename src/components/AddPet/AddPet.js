import React from 'react';
import Topbar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer'
// import { UserCtx } from '../components/context/UserCtx'


const AddPet = _ => {
    const inputs = [
        {type: 'text', placeholder: 'Nome completo'},
        {type: 'email', placeholder: 'E-mail'},
        {type: 'text', placeholder: 'CPF'},
        {type: 'text', placeholder: 'Telefone'}
    ]

    return (
        <div className="acc-box">
            <div className="acc cadastro">
                <p>Pedrigui's com você de P a I</p>
                <h1>FOTO AQUI</h1>
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

export default AddPet;

