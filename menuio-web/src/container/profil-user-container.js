import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
import InputComponent from '../component/input-component'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class ProfilUserContainer extends Component {
    constructor () {
        super()
        this.state = {
            user: {},
            idUser: localStorage.getItem('idUser')
        }
    }

    componentDidMount () {
        fetch(proxyurl + baseUrl + '/proprietaire/' + this.state.idUser)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ user: result })
                console.log(this.state.user)
            })
    }

    render () {
        return (
            <div>
                <HeaderAppContainer />

                <div className='text-center'>
                    <h1>Mon profil</h1>
                </div>

                <form>

                    <div className='form-row'>
                        <InputComponent
                            text='Nom'
                            id='nom'
                            name='nom'
                            type='text'
                            value={this.state.user.nom}
                            classNameDiv='form-group col-md-6'
                        />

                        <InputComponent
                            text='Prenom'
                            id='prenom'
                            name='prenom'
                            type='text'
                            value={this.state.user.prenom}
                            classNameDiv='form-group col-md-6'
                        />
                    </div>

                    <InputComponent
                        text='Email'
                        id='email'
                        name='email'
                        type='email'
                        value={this.state.user.email}
                        classNameDiv='form-group'
                    />

                    <InputComponent
                        text='Téléphone'
                        id='telephone'
                        name='telephone'
                        type='tel'
                        value={this.state.user.telephone}
                        classNameDiv='form-group'
                    />

                    <InputComponent
                        text='Addresse'
                        id='addresse'
                        name='addresse'
                        type='text'
                        value={this.state.user.addresse}
                        classNameDiv='form-group'
                    />

                    <InputComponent
                        text='Mot de passe '
                        id='passwords'
                        name='passwords'
                        type='password'
                        value={this.state.user.passwords}
                        classNameDiv='form-group'
                    />

                </form>
            </div>
        )
    }
}

export default ProfilUserContainer
