import './sobrenos.scss'
import React from 'react'
import Topbar from '../TopBar/TopBar'
import Footer from '../Footer/Footer'


const SobreNos = props => {
    return (
        <section>
            <div class="gatinho-background">
                <ul>
                    <li> <a href=""> Home </a> </li>
                    <li> / </li>
                    <li> <a href=""> Sobre nós </a> </li>
                </ul>

                <p> Sobre nós </p>
            </div>
            <div class="background-info">
                <div class="info">
                    <h3> Sobre Nós </h3>
                    <p> Somos uma empresa inovadora que busca criar soluções atuais para o segmento Pet no Brasil. </p>

                    <h3> Nossa Missão </h3>
                    <p> Aumentar o bem estar dos nossos Pets, propiciando o melhor cuidado possível, todos os dias, aproximando tutores e prestadores de serviços. </p>
                </div>
                <div class="redes-sociais">
                    <ul>
                        <li>
                            <a href="">
                                <img src={require("./Redes-sociais/facebook.png")} alt="Logo do facebook" id="facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={require("./Redes-sociais/instagram.png")} alt="Logo do instagram" id="instagram" />
                            </a>
                        </li>
                        <li>
                            <img src={require("./Petshop-logo/PetShop Logo.png")} alt="Logo PedriGui" id="logo" />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

const SobrenosPage = props => {
    return (
        <div id="SobrenosP">
            <Topbar />
            <SobreNos />
            <Footer />
        </div>
    )
}



export default SobrenosPage;