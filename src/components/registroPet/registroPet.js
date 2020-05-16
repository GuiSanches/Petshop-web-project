import React from 'react'
import Topbar from '../TopBar/TopBar'
import Footer from '../Footer/Footer'

const RegistroPet = props => {
    return (
        <div id="registro">
            <Topbar />
            <Registro />
            <Footer />
        </div>

    )
}

const Registro = _ => (
    <section>
        <div class="selecionar-pet">
            <div id="titulo">
                <h1> Selecione seu pet </h1>
            </div>
            <ul>
                <li> <a href=""> <img src={require("./Icones/botao-esquerdo.png")} alt="Botão que aponta para esquerda" class="botao" /> </a> </li>
                <li> <a href=""> <img src={require("./Pets/coelho.jpg")} alt="Imagem de um coelho" id="coelho" /> </a> </li>
                <li> <img src={require("./Pets/gato.png")} alt="Imagem de um gato" id="gato" /> </li>
                <li> <a href=""> <img src={require("./Pets/cachorro.jpg")} alt="Imagem de um cachorro" id="cachorro" /> </a> </li>
                <li> <a href=""> <img src={require("./Icones/botao-direito.png")} alt="Botão que aponta para direita" class="botao" /> </a> </li>
            </ul>
        </div>

        <div class="dados">
            <div class="info-pet">
                <div id="titulo"> <h1> Informações do Pet </h1> </div>
                <div id="info">
                    <div> Nome: Veludo </div>
                    <div> Idade: 7 anos </div>
                    <div> Tipo: Gato </div>
                </div>
            </div>

            <div class="status-pet">
                <h3> Próxima Consulta: 05/05/2020 </h3>
                <ul>
                    <li id="situacao-atual"> Situação Atual: </li>
                    <li id="situacao-atual-res"> Saúdavel </li>
                </ul>
            </div>
        </div>

        <div class="registrar-btn">
            <button> Registrar novo Pet </button>
            <hr />
        </div>
    </section>
)

export default RegistroPet