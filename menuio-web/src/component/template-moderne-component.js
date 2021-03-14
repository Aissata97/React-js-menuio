import React from 'react'
import HeaderMenuComponent from '../component/header-menu-component'
import '../css/templateModerne.css'
// const urlPage = 'http://localhost:8081'

const TemplateModerneComponent = ({ produits, categories, onClickCategorie, onClickAllCategories, bgTemplate, colorTitreProd, colorTitreNav, colorTitreCat, colorBouton, bgHeader, colorPrix, colorTextBtn, bgNavigationCat, logo, onClickPlusDetail, onClickPanier }) => (
    <div>
        <HeaderMenuComponent
            bgHeader={bgHeader}
            logo={logo}
            onClickPanier={onClickPanier}
        />
        <div className='categories-scroll-menu text-center' style={{ backgroundColor: bgNavigationCat }}>
            <p onClick={onClickAllCategories} style={{ color: colorTitreNav }}>Toutes</p>
            {categories.map((categorie, i) => <p onClick={onClickCategorie} key={i} style={{ color: colorTitreNav }} id={categorie.id}>{categorie.nom}</p>)}
        </div>

        <div>
            {produits.map((item, index) =>
                <div key={index} className='tm-items'>
                    <div className='text-center'>
                        <h3 style={{ color: colorTitreCat }}>{item.categorie}</h3>
                    </div>
                    <div className='tm-all-produits'>
                        {item.produits.map((produit, i) =>
                            <div key={i} className='tm-produit' style={{ backgroundColor: bgTemplate }}>
                                <img src={'https://aissatabucket.s3.amazonaws.com/' + produit.url_image} alt={'image de ' + produit.nom} />
                                <div className='text-center'>
                                    <p style={{ color: colorTitreProd }}>{produit.nom}</p>
                                    <p style={{ color: colorPrix }}>{produit.prix + '$'}</p>
                                </div>
                                <button type='button' onClick={onClickPlusDetail} style={{ backgroundColor: colorBouton, color: colorTextBtn }} data-toggle='modal' data-target='#modalDetailProduit' id={i} name={index}>+</button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    </div>
)

export default TemplateModerneComponent
