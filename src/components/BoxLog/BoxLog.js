import React from 'react'
import './BoxLog.scss'
import { Link } from 'react-router-dom'
import db from '../../components/Db/Db'

const generateList = array => array.map(row => generateItem(row))

const generateItem = array => (
    <>
        <div className="item item-1">{array[0]}</div>
        {array.slice(1).map(item => <div className="item" key={item}>{item}</div>)}
    </>
)


const item = [
    '47 unidades',
    <i class="fab fa-facebook" style={{ fontSize: '4em' }}></i>,
    'Nome',
    'Qtd',
    'Preço'
]

const items = Array.from({ length: 7 }).fill(item)

const generateBoxHeader = labels => labels.map(
    label => <div>{label}</div>
)

const BoxLog = ({ title, headerLabels, getData }) => {
    const [items_, setItems_] = React.useState(null)
    
    return (
        <div className="box-info">
            <div className="box-container">
                <div className="box-header">
                    <h1>{title}</h1>
                </div>
                <div className="box-grid-container">
                    <div className="box-grid"> {/* Grid */}
                        {generateBoxHeader(headerLabels)}
                        {generateList(items)}

                    </div>

                    <div className="box-action">
                        <h3>Preço estimado: R$ 360.00</h3>
                        <div className="buy-items">
                            <button id="buy-store">
                                Comprar
                            </button>

                        </div>
                    </div>

                </div>

            </div>
            <div id="teste">                
            </div>

        </div>
    )
}

export default BoxLog