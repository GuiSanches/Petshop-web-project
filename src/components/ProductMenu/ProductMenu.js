import React from 'react';
import './ProductMenu.scss';
import Dropdown from '../Dropdown/Dropdown'
import api from '../Db/Db'
import { ProductCtx } from '../context/ProductsCtx'
// get our fontawesome imports

const ProductsPage = ({ title, search }) => {
    const [loading, setLoading] = React.useState(true)
    const [cardsBack, setCardsBack] = React.useState(null)
    const [cardsFilter, setCardsFilter] = React.useState(cardsBack)

    React.useEffect(() => {
        api.getProducts().then(res => {
            const Products = res.map(res => ({
                ...res,
                name: res.Nome,
                price: res.Preco,
                link: '#',
                Foto: res.Foto,
            }))
            const filter = Products.filter(p => p.Nome.includes(search))
            setCardsBack(Products)
            setCardsFilter(filter.length > 0 ? filter : Products)
            setLoading(false)
        }).catch(e => console.log(e))
    }, [])

    React.useEffect(() => {
        console.log(cardsBack, 'trocou')
    }, [cardsFilter])

    const handleFilter = item => {
        const filter = item.filter([...cardsBack])
        console.log(item, filter)
        setCardsFilter(filter)
    }

    return (
        <div className="Products-container">
            <h1 className="Products-title">{title}</h1>
            <SearchProduct onFilterChange={handleFilter} />
            <ProductsGrid cards={cardsFilter} />
        </div>
    );
}

const HandleFilters = {
    HighPrice: price => {
        return price.sort((a, b) => b.Preco['$numberDecimal'] - a.Preco['$numberDecimal'])
    },
    LowPrice: price => {
        return price.sort((a, b) => a.Preco['$numberDecimal'] - b.Preco['$numberDecimal'])
    },
    Relevance: relevance => {
        return relevance.sort((a, b) => a.Estoque - b.Estoque)
    },
    Promotion: promotion => {
        return promotion.filter(p => p.Oferta)
    },
    Shipping: shipping => {
        return shipping.sort((a, b) => (a.FreteGratis === b.FreteGratis) ? 0 : a.FreteGratis ? -1 : 1)
    },
    None: arr => arr
}

const options = [
    {
        id: 0,
        title: 'Maior preço',
        selected: false,
        key: 'price',
        filter: HandleFilters.HighPrice
    },
    {
        id: 1,
        title: 'Menor Preço',
        selected: false,
        key: 'entrega',
        filter: HandleFilters.LowPrice
    },
    {
        id: 2,
        title: 'Relevância',
        selected: false,
        key: 'frete',
        filter: HandleFilters.Relevance
    },
    {
        id: 3,
        title: 'Promoção',
        selected: false,
        key: 'disponibilidade',
        filter: HandleFilters.Promotion
    },
    {
        id: 4,
        title: 'Frete',
        selected: false,
        key: 'location',
        filter: HandleFilters.Shipping
    }
]


const SearchProduct = ({ onFilterChange }) => {
    const [filterOptions, setFilterOptions] = React.useState(options)
    const [selectedId, setSelectedId] = React.useState(-1)
    const [listOpen, setListOpen] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState({ title: 'Nenhum filtro' })

    const updateSelected = (item, id) => {
        setSelectedOption(item)
        if (id !== -1) onFilterChange(item)
        else onFilterChange({ filter: HandleFilters.None })
        setSelectedId(id)
    }

    const toggleSelected = (id) => {
        let temp = filterOptions

        // Uncheck already selected
        if (selectedId !== -1) temp[selectedId].selected = false

        // Remove already
        if (selectedId === id) {
            updateSelected({ title: 'Nenhum filtro' }, -1)
        } else { // check filter
            temp[id].selected = true
            updateSelected(temp[id], id)
        }
        // Update
        setFilterOptions(temp)
    }

    const toggleList = () => {
        setListOpen(!listOpen)
    }

    return (
        <div className="Search-container">
            <div className="Search-container-box">
                <div className="input-box">
                    <input className="nav-search" type="search" autoComplete="off" name="product-filter" placeholder="Pesquisar" />
                </div>
                <div className="input-box">
                    <input
                        className="nav-search filter"
                        onPointerDown={toggleList}
                        disabled={true}
                        placeholder={`Ordenar por: ${selectedOption.title}`} />
                    {listOpen ? <i className="fas fa-arrow-up dropdown-icon"></i>
                        : <i className="fas fa-arrow-down dropdown-icon"></i>}
                    <Dropdown
                        list={filterOptions}
                        toggleItem={toggleSelected}
                        listOpen={listOpen}
                        setListOpen={setListOpen}
                    />
                </div>
            </div>
        </div>
    )
}

const ProductsGrid = ({ cards }) => {

    const ProductCard = ({ card }) => {
        const { setProducts } = React.useContext(ProductCtx)
        const handleBuy = _ => {
            setProducts(card)
            alert('Produto adicionado com sucesso no carrinho')
        }
        return (
            <div className="product-grid-item" key={card.name}>
                <div className="P-card-product">
                    <div className="product-image">
                        <img src={require(`../../Images/Icones/${card.Foto}`)} alt="Imagem produto" />
                    </div>
                    <div className="product-info">
                        <p>{card.name}</p>
                        <p>R$: {card.price} </p>
                        {card.FreteGratis && <p style={{ fontSize: '1em' }}>Frete grátis</p>}
                    </div>
                    <div>
                        <button href="" className="product-buy" onClick={handleBuy}>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cards-p-container">
            <div className="cards-grid">
                {cards == null ? 'Carregando...' : cards.map(card => <ProductCard card={card} key={card._id} />)}
            </div>
        </div>
    )
}

export default ProductsPage;
