import React, { Component } from 'react'
import HeaderNoConnect from '../component/header-no-connect'
import '../css/accueil-principal.css'
import '../css/contact-page.css'
import imageContact from'../images/photo-carte.jpeg'

class AccueilPrincipal extends Component {

    render () {
        return (
            <div className='main-page-acceuil-principal'>

                <div className='premier-ecran'>
                        {/*Navebar */}
                        <HeaderNoConnect />
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
                </div> { /** Fin div deuxieme- ecran */}


                {/* Troisième écran */}
                <div className='main-page-contact' id='contact'>
                    <div className='a-propos-container'>
                        <h1>À propos</h1>
                        <p>Le site a été crée uniquement dans le but de pratiquer les notions apprises en programmation.</p>
                        <p>Les technologies utilisés sont : Spring boot, React Js, PostgreSql et Heroku .</p>
                    </div>

                    <h2>Notre équique</h2>

                    <div className='div-equipe'>
                        <div className='div-carte'>
                            <div className='carte'>
                                <img src={imageContact} alt='Aissata' className='imgCarte' />
                                <div className="container-carte-info">
                                    <h2>Aïssata Mama Ouattara</h2>
                                    <p className='titre-post'>Développeuse web et mobile</p>
                                    <p>Developpeuse web avec un penchant pour le backend et le developpement d'application mobile</p>
                                    <p>aissata.ouattara@outlook.fr</p>
                                    <p><button className='btn-contact'>Contact</button></p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div> {/** Fin div main-page-contact */}



                        
            </div>
    )}
}

export default AccueilPrincipal