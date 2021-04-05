import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import InputComponent from '../component/input-component'
import Loading from '../component/loading'
import '../css/inscription.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class ConnexionContainer extends Component {
    constructor () {
        super()
        this.state = {
            valuesForm: {},
            login: false,
            error: '',
            isRestoExists: null,
            isLoading : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({
            valuesForm: Object.assign(this.state.valuesForm, { [event.target.name]: event.target.value })
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState({
            isLoading : true
        })
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.valuesForm)
        }

        fetch(proxyurl + baseUrl + '/connexion', requestOptions)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    this.setState({ 
                        error: 'Les informations entrées sont incorrectes !!!',
                        login: false
                    })
                }
                return response.json()
            })
            .then((result) => {
                if (result.accessToken !== undefined){
                    this.setState({ login: true })
                    localStorage.setItem('login', JSON.stringify({
                        login: true,
                        token: result.accessToken
                    }))
                    localStorage.setItem('prenom', result.prenom)
                    localStorage.setItem('idUser', result.id)

                    ///Si l'utilisateur est bien inscrit mais qu'il pas enregistrer son restaurant
                    fetch(proxyurl + baseUrl + '/cheick-restaurant/' + result.id)
                    .then((response2) => {
                        if (response2.status < 200 || response2.status >= 300){
                            this.setState({
                                isRestoExists : false
                            })
                        }
                        return response2.json()
                    })
                    .then((result2) => {
                        this.setState({ 
                            isRestoExists: result2,
                            isLoading : false
                        })
                    })
                }
                
            })
    }

    render () {
        if (this.state.login && this.state.isRestoExists) {
            return <Redirect to='/acceuil' />
        } else if ( (this.state.login) && (this.state.isRestoExists === false)) {
            return <Redirect to={'/inscription/' + localStorage.getItem('idUser')} />
        }else if (this.state.login === false && this.state.isRestoExists === false){
            return <Redirect to='/inscription' />
        }
        /*if (this.state.isLoading){
            return <Loading/>
        }*/

        return (
            <div>
                <div className='header'>
                    <img src='https://aissatabucket.s3.amazonaws.com/menui-logo.png' alt='Logo de menuio' />
                    <Link to='/'><button>Inscription</button></Link>
                </div>

                <div>
                    <div>
                        <h1>Connexion</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <InputComponent
                            id='email'
                            name='email'
                            type='text'
                            text='E-mail (votre e-mail personnel)'
                            classNameDiv='form-group'
                            onChange={this.handleChange}
                        />
                        <InputComponent
                            id='passwords'
                            name='passwords'
                            type='password'
                            text='Mot de passe '
                            classNameDiv='form-group'
                            onChange={this.handleChange}
                        />

                        <div className='text-center'>
                            <input type='submit' value='Se connecter' />
                        </div>
                        <span>{this.state.error}</span>

                    </form>

                </div>

            </div>
        )
    }
}

export default ConnexionContainer
