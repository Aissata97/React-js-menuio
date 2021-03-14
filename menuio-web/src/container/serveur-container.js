/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
import ModalAddServeur from '../component/modal-add-serveur-component'
import ModalEditServeur from '../container/modal-edit-serveur-container'
import '../css/serveur.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class ServeurContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            idResto: localStorage.getItem('idResto'),
            serveurs: [],
            valuesForm: {},
            errors: {},
            idServeurToDelete: null,
            isUpdate: false,
            requiredItem: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDeleteServeur = this.handleDeleteServeur.bind(this)
        this.saveModalDetails = this.saveModalDetails.bind(this)
    }

    // Tous les serveurs à partir de IdResto
    componentDidMount () {
        this.getListServeur()
    }

    getListServeur () {
        fetch(proxyurl + baseUrl + '/serveur/' + this.state.idResto)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ serveurs: result })
                // console.log(this.state.serveurs)
            })
    }

    handleChange (event) {
        this.setState({
            valuesForm: Object.assign(this.state.valuesForm, { [event.target.name]: event.target.value })
        })
    }

    handleSubmit (event) {
        event.preventDefault()

        if (this.validationForm()) {
            const valuesForm = this.state.valuesForm
            const date = new Date()
            date.toLocaleDateString()
            const dataToSend = { nom: valuesForm.nom, prenom: valuesForm.prenom, email: valuesForm.email, telephone: Number(valuesForm.telephone), addresse: valuesForm.addresse, passwords: valuesForm.passwords, date_enregistrement: date, idrestaurant: Number(this.state.idResto) }

            const requestOptionsForm = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(dataToSend)
            }

            fetch(proxyurl + baseUrl + '/ajout/serveur/' + this.state.idResto, requestOptionsForm)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.setState({ serveurs: data })
                })
        }
    }

    validationForm () {
        const valuesForm = this.state.valuesForm
        const errors = {}
        let isValidForm = true

        if (valuesForm.password2 !== valuesForm.passwords) {
            isValidForm = false
            errors.password2 = 'Les mot de passe doivent être identiques'
        }

        if (typeof valuesForm.telephone !== 'undefined') {
            if (!valuesForm.telephone.match(/^[0-9]{10}/)) {
                isValidForm = false
                errors.telephone = 'Cet champs doit contenir 10 chiffres'
            }
        }

        this.setState({ errors: errors })
        return isValidForm
    }

    replaceModalItem (index) {
        this.setState({
            requiredItem: index
        })
    }

    handleChangeDelete (idServeurToDelete, i) {
        this.setState({ idServeurToDelete: idServeurToDelete })
    }

    handleDeleteServeur () {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(proxyurl + baseUrl + '/serveur/' + this.state.idServeurToDelete + '/' + this.state.idResto, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                // this.getListServeur()
                this.setState({ serveurs: result })
            })
    }

    saveModalDetails (item, event) {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: item.nom, prenom: item.prenom, email: item.email, telephone: Number(item.telephone), addresse: item.addresse, passwords: item.passwords })
        }

        fetch(proxyurl + baseUrl + '/serveur/' + item.id, requestOptions)
            .then((response) => {
                response.json()
            })
            .then((result) => {
                this.getListServeur()
            })
    }

    render () {
        const requiredItem = this.state.requiredItem
        const modalData = this.state.serveurs[requiredItem]
        return (
            <div>
                <HeaderAppContainer />

                {this.state.serveurs.length === 0

                    ? <div className='text-center'>
                        <h1>Nous n'avons aucun serveur enregistré pour le moment ! </h1>
                        <button type='button' data-toggle='modal' data-target='#modalAddServeur'>Ajouter un serveur</button>
                    </div>

                    : <div className='mx-5 pt-2'>
                        <div className='text-center'>
                            <h1>Liste des serveurs</h1>
                        </div>

                        <button type='button' className='btnAdd' data-toggle='modal' data-target='#modalAddServeur'>+</button>
                        <table className='table table-striped'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th> </th>
                                    <th scope='col'>Nom</th>
                                    <th scope='col'>Prenom</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Téléphone</th>
                                    <th scope='col'>Addresse</th>
                                    <th scope='col'>Date d'enregistrement</th>
                                    <th scope='col'>Code</th>
                                    <th> </th>

                                </tr>
                            </thead>

                            <tbody>
                                {this.state.serveurs.map((serveur, i) =>
                                    <tr key={i}>
                                        <td><button type='button' className='btn btn-info btn-rounded btn-sm my-0' data-toggle='modal' data-target='#modalEditServeur' onClick={() => this.replaceModalItem(i)}>Editer</button></td>
                                        <td>{serveur.nom}</td>
                                        <td>{serveur.prenom}</td>
                                        <td>{serveur.email}</td>
                                        <td>{serveur.telephone}</td>
                                        <td>{serveur.addresse}</td>
                                        <td>{new Date(serveur.date_enregistrement).getDay() + '-' + (new Date(serveur.date_enregistrement).getMonth() + 1) + '-' + new Date(serveur.date_enregistrement).getFullYear()}</td>
                                        <td>{serveur.passwords}</td>
                                        <td><button type='button' className='btn btn-danger btn-rounded btn-sm my-0' data-toggle='modal' data-target='#confirm-delete' onClick={() => this.handleChangeDelete(serveur.id, i)}>Supprimer</button></td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>}

                <div>

                    <ModalAddServeur
                        onChange={this.handleChange}
                        onClickEnregistrer={this.handleSubmit}
                        errorMdp={this.state.errors.password2}
                        errorTel={this.state.errors.telephone}
                        dataDissmissAdd={this.state.dataDissmissAdd}
                    />

                    <ModalEditServeur
                        id={modalData === undefined ? '' : modalData.id}
                        nom={modalData === undefined ? '' : modalData.nom}
                        prenom={modalData === undefined ? '' : modalData.prenom}
                        email={modalData === undefined ? '' : modalData.email}
                        telephone={modalData === undefined ? '' : modalData.telephone}
                        addresse={modalData === undefined ? '' : modalData.addresse}
                        passwords={modalData === undefined ? '' : modalData.passwords}
                        saveModalDetails={this.saveModalDetails}
                    />

                    <div className='modal fade' id='confirm-delete' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    Confirmation de suppression
                                </div>
                                <div className='modal-body'>
                                    Êtes-vous sûre de vouloir supprimer cet serveur ?
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' className='btn btn-default' data-dismiss='modal'>Annuler</button>
                                    <a className='btn btn-danger btn-ok' onClick={this.handleDeleteServeur} data-dismiss='modal'>Supprimer</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default ServeurContainer
