import React from 'react'
import HeaderMenuComponent from '../component/header-menu-component'
import '../css/templateElegant.css'

const TemplateElegantComponent = ({ produits, categories, onClickCategorie, onClickAllCategories, bgTemplate, colorTitreProd, colorTitreNav, colorTitreCat, colorBouton, bgHeader, colorPrix, colorTextBtn, bgNavigationCat, logo, onClickPlusDetail, onClickPanier }) => (
    <div>
        <HeaderMenuComponent
            bgHeader={bgHeader}
            logo={logo}
            onClickPanier={onClickPanier}
        />
        <div className='categories-scroll-menu text-center' style={{ backgroundColor: bgNavigationCat }}>
            <p onClick={onClickAllCategories} style={{ color: colorTitreNav }}>Toutes</p>
            {categories.map((categorie, i) => <p style={{ color: colorTitreNav }} onClick={onClickCategorie} key={i} id={categorie.id}>{categorie.nom}</p>)}
        </div>

        {produits.map((item, index) =>
            <div key={index} className='te-items'>
                <h3 style={{ color: colorTitreCat }}>{item.categorie}</h3>
                <div className='te-all-produits'>
                    {item.produits.map((produit, i) =>
                        <div key={i} className='te-produits' style={{ backgroundColor: bgTemplate }}>
                            <img src={'https://aissatabucket.s3.amazonaws.com/' + produit.url_image} alt={'image de ' + produit.nom} />
                            <div>
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
)

export default TemplateElegantComponent
