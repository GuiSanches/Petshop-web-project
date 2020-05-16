import React from 'react'
import './SectionBrands.scss'
import Marca from '../../Images/Marcas/hills.png'

const Brands = _ => {
    const images = []
    for(let i = 0; i < 5; i++) images.push(Marca)
    return (
        <div id="image">
            {images.map((i,j) => <img className="brand-img" key={j} src={Marca} alt=""/>)}
        </div>
    )
}

const SectionBrand = ({title}) => {

    return (
        <div className="brands-container">
            <div className="brands-wrapper">
                <h1 className="category-title">{title}</h1>
                <div className="all-brands">
                    <Brands />
                </div>
            </div>
        </div>
    )
}


export default SectionBrand;

