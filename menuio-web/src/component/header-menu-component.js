import React from 'react'
import '../css/header-menu.css'

const HeaderMenuComponent = ({ logo, bgHeader, onClickPanier }) => (
    <div className='header-menu' style={{ backgroundColor: bgHeader }}>
        <img src={logo} alt='logo du site' />
        <img src='https://aissatabucket.s3.amazonaws.com/panier.png' alt='icone panier' onClick={onClickPanier} />
    </div>

)

export default HeaderMenuComponent
