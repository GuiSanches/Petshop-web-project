import React, { useState } from 'react'
import './BoxLog.scss'
import { Link } from 'react-router-dom'


const generateList = array => array.map(row => generateItem(row))

const generateItem = array => (
    <>
        <div className="item item-1">{array[0]}</div>
        {array.slice(1).map(item => <div className="item" key={item}>{item}</div>)}
    </>
)


const item = [
    '12345',
    <i class="fab fa-facebook" style={{ fontSize: '4em' }}></i>,
    'Conjunto Completo',
    '22',
    'R$ 119, 90'
]

const items = Array.from({ length: 7 }).fill(item)

const generateBoxHeader = labels => labels.map(
    label => <div>{label}</div>
)

const BoxLog = ({ title, headerLabels, getData }) => {
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
                        <div className="inventory-actions">
                            <button id="buy-store">
                                Editar produto
                            </button>
                            <button id="buy-store">
                                Add produto
                            </button>
                            <button id="buy-store">
                                Deletar produto
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BoxLog