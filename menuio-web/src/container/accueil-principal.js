import React, { Component } from 'react'
import '../css/accueil-principal.css'

class AccueilPrincipal extends Component {

    render () {
        return (
            <div className='main'>
                <div className='navbar'>
                    <div>
                        <img src='https://aissatabucket.s3.amazonaws.com/menui-logo.png' alt='Logo App' />
                    </div>
                    { /*Droite*/}
                    <div>
                        <a href='#'>À propos </a>
                        <a href='#'>Connexion </a>
                        <a href='#'>Creer un QR Code </a>    
                    </div>  
                </div>

                <div className='body-page'>
                    <div className='premier-ecran'>
                        <div className='premier-ecran-gauche'>
                            <div>
                                <h1>QR Code Menu, </h1>
                                <p>un moyen simple de numerisé et personnalisé votre menu </p>
                            </div>
                            
                            <div>
                                <button><a href='#'>Exemple de menu</a></button>
                                <button><a href='#'>Creer un QR Code</a></button>
                            </div>
                        </div>
                        

                        <div className='premier-ecran-droite'>
                            <img src='https://aissatabucket.s3.amazonaws.com/elegant.png' alt='template elegant'></img>
                            <img src='https://aissatabucket.s3.amazonaws.com/moderne.png' alt='template moderne'></img>
                        </div>
                    </div>

                    <div className='second-ecran'>
                        <h2>Fonctionnement de Menuio</h2>
                        <div>
                            <img src='https://aissatabucket.s3.amazonaws.com/moderne.png'/>
                            <div>
                                <p>Comment fonctionne Menuio ?</p>
                                <p>Le site est concu spécialement pour les propriétaires de restaurant et bar afin de creer un menu numérisé et personnalisé</p>
                                <p>Vous devez vous d'abord vous inscrire et inscrire votre restaurant pour accéder au site et ses fonctionnalités </p>
                                <p>Une fois inscris sur le site, vous pourrez choisir une template, et personnaliser votre menu à votre gout </p>
                                <p>Et enfin générer un QR Code, pour permettre à vos clients d'accéder à votre menu depuis leur telephone ou tablette</p>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
    )}
}

export default AccueilPrincipal