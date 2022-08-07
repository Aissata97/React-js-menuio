import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import InputComponent from '../component/input-component'
import HeaderNoConnect from '../component/header-no-connect'
import '../css/connexion-inscription.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class InscriptionRestoFormContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            valuesForm: {},
            errors: {},
            errorData: ''
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
        if (this.handleValidation()) {
            const idProprio = this.props.match.params.id
            const valuesForm = this.state.valuesForm
            const dataToSend = { nom: valuesForm.nom, email: valuesForm.email, addresse: valuesForm.addresse, nombre_table: valuesForm.nombre_table, idProprietaire: Number(idProprio) }

            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            }

            fetch(proxyurl + baseUrl + '/inscription/restaurant', requestOptions)
                .then((response) => {
                    if (response.status === 400) {
                        this.setState({ errorData: 'Email déjà utilisé par un restaurant' })
                        console.log(response)
                        //throw new Error(response.statusText)
                    }
                    return response.text()
                })
                .then((data) => {
                    toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter ')
                })
        }
    }

    handleValidation () {
        const valuesForm = this.state.valuesForm
        const errors = {}
        let isValidForm = true

        // Nom
        if (!valuesForm.nom) {
            isValidForm = false
            errors.nom = 'Ce champs ne peut être vide'
        }

        // Email
        if (!valuesForm.email) {
            isValidForm = false
            errors.email = 'Ce champ ne peut pas être vide'
        }

        if (typeof valuesForm.email !== 'undefined') {
            const lastAtPos = valuesForm.email.lastIndexOf('@')
            const lastDotPos = valuesForm.email.lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && valuesForm.email.indexOf('@@') === -1 && lastDotPos > 2 && (valuesForm.email.length - lastDotPos) > 2)) {
                isValidForm = false
                errors.email = "L'email n'est pas valide"
            }
        }

        this.setState({ errors: errors })
        return isValidForm
    }

    render () {
        return (
            <div className='inscription-page-container'>
                <HeaderNoConnect />

                <div className='inscription-container'>
                    <div>
                        <h1>Inscription : </h1>
                        <p>Étape 2 : Entrez les informations concernant votre restaurant</p>
                    </div>

                    <ToastContainer autoClose={10000} />
                    <form onSubmit={this.handleSubmit}>
                        <InputComponent
                            id='nom'
                            name='nom'
                            type='text'
                            text='Nom du restaurant '
                            classNameDiv='div-input-form'
                            classNameInput='div-input'
                            onChange={this.handleChange}
                            
                        />
                        <span>{this.state.errors.nom}</span>

                        <InputComponent
                            id='email'
                            name='email'
                            type='text'
                            text='E-mail du restaurant'
                            classNameDiv='div-input-form'
                            classNameInput='div-input'
                            onChange={this.handleChange}
                        />
                        <span>{this.state.errors.prenom}</span>

                        <InputComponent
                            id='addresse'
                            name='addresse'
                            type='text'
                            text='Addresse du restaurant'
                            classNameDiv='div-input-form'
                            classNameInput='div-input'
                            onChange={this.handleChange}
                        />

                        <InputComponent
                            id='nombre_table'
                            name='nombre_table'
                            type='number'
                            text='Nombre de table dans le restaurant'
                            classNameDiv='div-input-form'
                            classNameInput='div-input'
                            onChange={this.handleChange}
                        />
                        <p>{this.state.errorData}</p>

                        <div className='text-center'>
                            <input type='submit' value='Envoyer' className='btn-inscription'/>
                        </div>
                            

                    </form>
                </div>
            </div>
        )
    }
}

export default InscriptionRestoFormContainer
