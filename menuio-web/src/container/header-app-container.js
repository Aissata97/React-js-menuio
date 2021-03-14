import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import '../css/headerApp.css'

class HeaderAppContainer extends Component {
    constructor () {
        super()
        /*this.state = {
            nomUser: localStorage.getItem('prenom'),
            idUser: localStorage.getItem('idUser'),
            idResto: localStorage.getItem('idResto')
        }*/

        this.handleLogout = this.handleLogout.bind(this)
        this.handleGoQrCodePage = this.handleGoQrCodePage.bind(this)
        this.handleGoProfilPage = this.handleGoProfilPage.bind(this)
        this.handleServeurPage = this.handleServeurPage.bind(this)
        this.handlePersonnalisationPage = this.handlePersonnalisationPage.bind(this)
        this.handleGoTemplatePage = this.handleGoTemplatePage.bind(this)
        this.handleGoPageMenu = this.handleGoPageMenu.bind(this)
    }

    handleLogout () {
        localStorage.clear()
        this.props.history.push('/inscription')
    }

    handleGoQrCodePage () {
        this.props.history.push('/acceuil')
    }

    handleGoProfilPage () {
        this.props.history.push('/profil/' + localStorage.getItem('prenom'))
    }

    handleServeurPage () {
        this.props.history.push('/serveur')
    }

    handlePersonnalisationPage () {
        this.props.history.push('/personnalisation/' + localStorage.getItem('idResto'))
    }

    handleGoTemplatePage () {
        this.props.history.push('/choix-template')
    }

    handleGoPageMenu () {
        this.props.history.push('/menu=' + localStorage.getItem('idResto'))
    }

    render () {
        return (
            <div>
                <div className='logoHeader'>
                    <div className=''>
                        <img src='https://aissatabucket.s3.amazonaws.com/menui-logo.png' alt='Logo App' />
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                            {localStorage.getItem('prenom')}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleGoProfilPage}>Voir mon profil</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleGoQrCodePage}>Voir mon Qr code</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleServeurPage}>Ajouter un serveur</Dropdown.Item>
                            <Dropdown.Item onClick={this.handlePersonnalisationPage}>Personnaliser le menu</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleGoTemplatePage}>Modifier le template</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleGoPageMenu}>Voir le menu</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Deconnexion</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>
        )
    }
}

export default withRouter(HeaderAppContainer)
