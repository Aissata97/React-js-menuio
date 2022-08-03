import React from 'react'
import '../css/header-no-connect.css'

const HeaderNoConnect = () => (
    <div className='navbar-no-connect'>
        <div>
            <a href='/'><img className='btn-navbar' src='https://aissatabucket.s3.amazonaws.com/menui-logo.png' alt='Logo App' /></a>
        </div>
        <div>
            <a href='/#aide'>Aide </a>
            <a href='/connexion'>Connexion </a>
            <a href='/#contact'>Contact </a>
            <button><a href='/inscription'>Creer un menu</a></button>
        </div>
    </div>
)
export default HeaderNoConnect
