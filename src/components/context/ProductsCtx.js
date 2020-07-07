import React from 'react'

const commonData = {
    _id: 0,
    Nome: 'Ração Golden',
    Foto: 'dog-food.svg',
    Preco: 45.60,
    Estoque: 27,
    Qtd: 5,
    Descricao: "A ração golden alimenta seu cachorro e da brilho ao seu pelo (do cachorro)",
    Tags: [
        "Rações e biscoitos",
        "cachorro",
        "alimentos"
    ]
}
export const ProductCtx = React.createContext([])

export default function ProductContext(props) {
    const [Products, setProduct] = React.useState([])
    const [isMounted, setIsMounted] = React.useState()
    const setProducts = data => {

        if (Products.length > 0) {
            if (Array.isArray(data)) setProduct([...Products, ...data])
            else setProduct([...Products, data])
        } else if (Array.isArray(data)) setProduct(data)
        else setProduct([data])

    }
    const clear = _ => {
        setProduct([])
        localStorage.setItem('carrinho', '[]')
    }

    React.useEffect(_ => {
        const products = JSON.parse(localStorage.getItem('carrinho'))
        if (products && (products.length > 0 && Products.length === 0)) {
            setProduct(products)
            if (Products.length > 0)
                localStorage.setItem('carrinho', JSON.stringify(Products))
        }
        // alert('oi')
    }, [isMounted])

    return (
        <ProductCtx.Provider value={{
            Products,
            setProducts,
            setProduct,
            clear
        }}>
            {props.children}
        </ProductCtx.Provider>
    )
}