import React from 'react';
import Topbar from '../components/TopBar/TopBar';
import './Login.scss'

const LoginPage = props => {
    const slogan = "Pedrigui's a clinica veterina e petshop mais completa que você ja viu"
    const benefits = "Só na Pedrigui's você encontra tudo o que precisa para o bem estar do seu pet. E só os membros da Pedrigui's encontram os melhores preços e benefícios."
    const topics = [
        "Tenha acesso a consultas veterinária, banho e tosa e a Petshop mais completa em um só lugar",
        "Acompanhe seu pet de perto. Tenha o registro completo de como anda a saúde do seu bichinho",
        "Oferecemos diversos descontos para nossos petlovers"
    ]

    const showTopic = topics => (
        <ul className="login-reasons">
            {topics.map(reason => <li key={reason}>{reason}</li>)}
        </ul>

    )
    return (
        <div className={"App"}>
            <Topbar />
            <div className="login-container">
                <div className="login-wrapper">

                    <div className="login-reasons">
                        <p className="login-reasons-p">{benefits}</p>
                        {showTopic(topics)}
                    </div>

                    <div className="login-box">
                        <div className="login">
                            <p>Pedrigui's com você de P a I</p>
                            <h1>Login</h1>
                            <form>
                                <input type="email" placeholder="E-mail" />
                                <input type="password" placeholder="Senha" />
                                <a href="">Esqueceu sua senha?</a>

                                <div className="form-btn">
                                    <button className="btn-login" type="submit">Criar conta</button>
                                    <button className="btn-submit" type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default LoginPage;

