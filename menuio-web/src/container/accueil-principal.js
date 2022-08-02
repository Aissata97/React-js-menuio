import React, { Component } from 'react'
import '../css/accueil-principal.css'

class AccueilPrincipal extends Component {

    render () {
        return (
            <div className='main'>

                <div className='premier-ecran'>
                        {/*Navebar */}
                    <div className='navbar'>
                        <div>
                            <img className='btn' src='https://aissatabucket.s3.amazonaws.com/menui-logo.png' alt='Logo App' />
                        </div>
                         <div>
                            <a href='#aide'>Aide </a>
                            <a href='/connexion' id='connexionAdmin'>Connexion </a>
                            <a href='#contact'>Contact </a>
                            <button><a href='/inscription'>Creer un menu</a></button>
                        </div>
                    </div>
                        {/* Centre de la page */}
                    <div className='body-page-premier-ecran'>
                        <div className='premier-ecran-gauche'>
                            <h1>
                                <b>QR Code Menu, </b>
                                <p>Adieu les menus classiques !</p>
                            </h1>
                            <div>
                                <button><a href='test'>Demo</a></button>
                                <button><a href='/inscription'>Creer un menu</a></button>
                            </div>
                        </div>

                        <div className='premier-ecran-droite'>
                            <img src='https://aissatabucket.s3.amazonaws.com/elegant.png' alt='template elegant'></img>
                            <img src='https://aissatabucket.s3.amazonaws.com/moderne.png' alt='template moderne'></img>
                        </div>
                    </div>
                </div>

                {/* Deuxième écran */}
                <div className='deuxieme-ecran' id='aide'>
                    <h2>Fonctionnement de Menuio</h2>
                    <div>
                        <img src='https://aissatabucket.s3.amazonaws.com/moderne.png' alt='template moderne'/>
                        <div className='paragraph-info'>
                            <p>Comment fonctionne Menuio ?</p>
                            <p>Le site est concu spécialement pour les propriétaires de restaurant et bar afin de creer un menu numérisé et personnalisé</p>
                            <p>Vous devez d'abord vous inscrire et inscrire votre restaurant pour accéder au site et ses fonctionnalités </p>
                            <p>Une fois inscris sur le site, vous pourrez choisir une template, et personnaliser votre menu à votre gout </p>
                            <p>Et enfin générer un QR Code, pour permettre à vos clients d'accéder à votre menu depuis leur telephone ou tablette</p>
                        </div>
                    </div>
                </div>

                {/* Troisième écran */}
                        
            </div>
    )}
}

export default AccueilPrincipal