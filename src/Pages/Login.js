import React from 'react';
import Topbar from '../components/TopBar/TopBar';
import './Login.scss'
import Footer from '../components/Footer/Footer'
// import { UserCtx } from '../components/context/UserCtx'

const LoginPage = props => {
    // const { userData } = React.useContext(UserCtx)

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


