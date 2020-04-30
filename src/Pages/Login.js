import React from 'react';
import Topbar from '../components/TopBar/TopBar';
import './Login.scss'
import Footer from '../components/Footer/Footer'
// import { UserCtx } from '../components/context/UserCtx'

const LoginPage = props => {
    const slogan = "Pedrigui's a clinica veterina e petshop mais completa que você ja viu"
    const benefits = "Só na Pedrigui's você encontra tudo o que precisa para o bem estar do seu pet. E só os membros da Pedrigui's encontram os melhores preços e benefícios."
    const topics = [
        "Tenha acesso a consultas veterinária, banho e tosa e a Petshop mais completa em um só lugar",
        "Acompanhe seu pet de perto. Tenha o registro completo de como anda a saúde do seu bichinho",
        "Oferecemos diversos descontos para nossos petlovers"
    ]
    // const { userData } = React.useContext(UserCtx)

    const showTopic = topics => {
        return (
            <ul className="acc-reasons">
                {topics.map(reason => <li key={reason}>{reason}</li>)}
            </ul>

        )
    }

    const Login = _ => {
        return (
            <div className="acc-box">
                <div className="acc">
                    <p>Pedrigui's com você de P a I</p>
                    <h1>Login</h1>
                    <form>
                        <input type="email" placeholder="E-mail" />
                        <input type="password" placeholder="Senha" />
                        <a href="">Esqueceu sua senha?</a>

                        <div className="form-btn">
                            <a className="btn-acc" href="/account/create">Criar conta</a>
                            <button className="btn-submit" type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (

        <Login />
    )
}

export default LoginPage;


