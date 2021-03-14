import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'
import InputComponent from '../component/input-component'

class ModalEditServeur extends Component {
    constructor () {
        super()
        this.state = {
            id: '',
            nom: '',
            prenom: '',
            email: '',
            telephone: null,
            addresse: '',
            passwords: ''
        }

        this.handleSaveServeur = this.handleSaveServeur.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            id: nextProps.id,
            nom: nextProps.nom,
            prenom: nextProps.prenom,
            email: nextProps.email,
            telephone: nextProps.telephone,
            addresse: nextProps.addresse,
            passwords: nextProps.passwords
        })
    }

    handleChangeNom (e) {
        this.setState({ nom: e.target.value })
    }

    handleChangePrenom (e) {
        this.setState({ prenom: e.target.value })
    }

    handleChangeEmail (e) {
        this.setState({ email: e.target.value })
    }

    handleChangeAddresse (e) {
        this.setState({ addresse: e.target.value })
    }

    handleChangeTelephone (e) {
        this.setState({ telephone: e.target.value })
    }

    handleChangePwd (e) {
        this.setState({ passwords: e.target.value })
    }

    handleSaveServeur (event) {
        const item = this.state
        this.props.saveModalDetails(item, event)
    }

    render () {
        return (
            <div className='modal fade modalEditClass' id='modalEditServeur' tabIndex='-1' role='dialog' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header text-center'>
                            <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>Formulaire de modification</h4>
                            <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>

                        <div>
                            <form className='modal-body mx-3' onSubmit={this.handleSaveServeur}>
                                <InputComponent
                                    id='nom'
                                    name='nom'
                                    type='text'
                                    text='Nom du serveur '
                                    value={this.state.nom}
                                    onChange={(e) => this.handleChangeNom(e)}
                                    required
                                    classNameDiv='form-group'
                                />

                                <InputComponent
                                    id='prenom'
                                    name='prenom'
                                    type='text'
                                    text='Prenom du serveur '
                                    onChange={(e) => this.handleChangePrenom(e)}
                                    value={this.state.prenom}
                                    required
                                    classNameDiv='form-group'
                                />

                                <InputComponent
                                    id='email'
                                    name='email'
                                    type='email'
                                    text='E-mail du serveur'
                                    onChange={(e) => this.handleChangeEmail(e)}
                                    required
                                    value={this.state.email}
                                    classNameDiv='form-group'
                                />

                                <InputComponent
                                    id='telephone'
                                    name='telephone'
                                    type='tel'
                                    text='Téléphone du serveur'
                                    onChange={(e) => this.handleChangeTelephone(e)}
                                    value={this.state.telephone}
                                    classNameDiv='form-group'
                                />

                                <InputComponent
                                    id='addresse'
                                    name='addresse'
                                    type='text'
                                    text='Addresse du serveur'
                                    onChange={(e) => this.handleChangeAddresse(e)}
                                    value={this.state.addresse}
                                    required
                                    classNameDiv='form-group'
                                />

                                <InputComponent
                                    id='passwords'
                                    name='passwords'
                                    type='password'
                                    text='Mot de passe'
                                    onChange={(e) => this.handleChangePwd(e)}
                                    value={this.state.passwords}
                                    required
                                    classNameDiv='form-group'
                                />

                                <div className='text-center'>
                                    <input type='submit' value='Envoyer' className='btn btn-outline-secondary btn-block editInside' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditServeur
