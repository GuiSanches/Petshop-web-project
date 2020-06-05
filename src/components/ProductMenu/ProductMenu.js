import React from 'react';
import './ProductMenu.scss';
import Dropdown from '../Dropdown/Dropdown'
// get our fontawesome imports

const ProductsPage = ({ title }) => {
    const defaultCards = Array.from(
        { length: 9 },
        () => ({
            name: 'Brinquedo 1',
            price: '6,90',
            link: '#',
            image: 'dog-food.svg'
        })
    )
    const [cards, setCards] = React.useState(defaultCards)
    return (
        <div className="Products-container">
            <h1 className="Products-title">{title}</h1>
            <SearchProduct />
            <ProductsGrid cards={cards} />
        </div>
    );
}

const options = [
    {
        id: 0,
        title: 'Maior preço',
        selected: false,
        key: 'price'
    },
    {
        id: 1,
        title: 'Menor Preço',
        selected: false,
        key: 'entrega'
    },
    {
        id: 2,
        title: 'Relevância',
        selected: false,
        key: 'frete'
    },
    {
        id: 3,
        title: 'Promoção',
        selected: false,
        key: 'disponibilidade'
    },
    {
        id: 4,
        title: 'Frete',
        selected: false,
        key: 'location'
    }
]

const SearchProduct = props => {
    const [filterOptions, setFilterOptions] = React.useState(options)
    const [selectedId, setSelectedId] = React.useState(-1)
    const [listOpen, setListOpen] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState({ title: 'Nenhum filtro' })

    const updateSelected = (item, id) => {
        setSelectedOption(item)
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
        return (
            <div className="product-grid-item" key={card.name}>
                <div className="P-card-product">
                    <div className="product-image">
                        <img src={require(`../../Images/Icones/${card.image}`)} alt="Imagem produto" />
                    </div>
                    <div className="product-info">
                        <p>{card.name}</p>
                        <p>R$: {card.price}</p>
                    </div>
                    <div>
                        <a href="" className="product-buy">Comprar</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cards-p-container">
            <div className="cards-grid">
                {cards.map(card => <ProductCard card={card} />)}
            </div>
        </div>
    )
}

export default ProductsPage;
