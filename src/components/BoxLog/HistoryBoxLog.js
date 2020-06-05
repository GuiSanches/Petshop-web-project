import React from 'react'
import './BoxLog.scss'
import Db from '../Db/Db'
import { UserCtx, TOKEN_KEY } from '../../components/context/UserCtx'

const generateList = arrayProducts => arrayProducts.map(el => {
    const commomProducts = {
        item: <i className="fab fa-facebook" style={{ fontSize: '4em' }}></i>,
        Nome: el.Nome,
    }

    const rowItemData = el.history.map(item => ({
        Data: new Date(item.Date),
        item: commomProducts.item,
        Nome: commomProducts.Nome,
        Qtd: item.Qtd,
        Price: item.Price
    }))

    return rowItemData.map(r => generateRow(r))
})

const generateRow = rowData => {
    const RowArray = [
        rowData.Data.toLocaleDateString('pt-BR'),
        rowData.item,
        rowData.Nome,
        rowData.Qtd,
        `R$ ${rowData.Price['$numberDecimal']}`
    ]

    return generateItem(RowArray)
}

const generateItem = array => (
    <>
        <div className="item item-1">{array[0]}</div>
        {array.slice(1).map(item => <div className="item" key={item}>{item}</div>)}
    </>
)


const item = [
    '47 unidades',
    <i className="fab fa-facebook" style={{ fontSize: '4em' }}></i>,
    'Nome',
    'Qtd',
    'Preço'
]

const items = Array.from({ length: 7 }).fill(item)

const generateBoxHeader = labels => labels.map(
    label => <div>{label}</div>
)

const BoxLog = ({ title, headerLabels, getData }) => {
    const [cart, setCart] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const { userData, type } = React.useContext(UserCtx)

    React.useEffect(() => {
        if (userData._id && loading) {
            Db.getProductsShopLog(userData._id).then(e => {
                setCart(e)
                setLoading(false)
            })
        }
    }, [loading])
    return (
        <div className="box-info">
            <div className="box-container">
                <div className="box-header">
                    <h1>{title}</h1>
                </div>
                <div className="box-grid-container">
                    <div className="box-grid"> {/* Grid */}
                        {generateBoxHeader(headerLabels)}
                        {loading ? 'carregando amigo' : generateList(cart)}

                    </div>

                    <div className="box-action">
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BoxLog