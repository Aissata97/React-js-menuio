import React from 'react'
import HeaderMenuComponent from '../component/header-menu-component'
import '../css/templateclassique.css'

const TemplateClassicComponent = ({ produits, categories, onClickAllCategories, onClickCategorie, onClickPlusDetail, bgTemplate, colorTitreProd, colorTitreNav, colorTitreCat, colorBouton, bgHeader, colorPrix, colorTextBtn, bgNavigationCat, logo, onClickPanier }) => (
    <div className='tc-main-principal'>
        <HeaderMenuComponent
            bgHeader={bgHeader}
            logo={logo}
            onClickPanier={onClickPanier}
        />
        <div className='categories-scroll-menu text-center' style={{ backgroundColor: bgNavigationCat }}>
            <p onClick={onClickAllCategories} style={{ color: colorTitreNav }} id='all'>Toutes</p>
            {categories.map((categorie, i) => <p onClick={onClickCategorie} style={{ color: colorTitreNav }} key={i} id={categorie.id}>{categorie.nom}</p>)}
        </div>
        <div className='tc-main-div' style={{ backgroundColor: bgTemplate }}>
            <div className='text-center'>
                <h1>MENU</h1>
            </div>

            <div>
                <div>
                    {produits.map((produit, index) =>
                        <div key={index} className='produits'>
                            <h2 style={{ color: colorTitreCat }}>{produit.categorie}</h2>
                            {produit.produits.map((prod, i) =>
                                <div key={i}>
                                    <p style={{ color: colorTitreProd }}>{prod.nom}</p>
                                    <p style={{ color: colorPrix }}>{prod.prix + '$'}</p>
                                    <button type='button' onClick={onClickPlusDetail} style={{ backgroundColor: colorBouton, color: colorTextBtn }} data-toggle='modal' data-target='#modalDetailProduit' id={i} name={index}>Ajouter</button>
                                </div>
                            )}
                        </div>

                    )}

                </div>
            </div>
        </div>
    </div>
)

export default TemplateClassicComponent
