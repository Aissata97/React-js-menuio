import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
import ModalCategorie from '../container/modal-categorie-container'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/pageCategorie.css'
import ModalAddCatgorie from '../component/modal-add-categorie-component'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class PageCategorieContainer extends Component {
    constructor () {
        super()
        this.state = {
            categories: [],
            idCategorieSelected: '',
            idResto: localStorage.getItem('idResto'),
            requiredItem: 0,
            idMenu: localStorage.getItem('idMenu'),
            nomCategorieToAdd: '',
            errorDelete: '',
            idCategorieTodelete: -1
        }
        this.replaceModalItem = this.replaceModalItem.bind(this)
        this.saveModalDetails = this.saveModalDetails.bind(this)
        this.handleChangeCategorie = this.handleChangeCategorie.bind(this)
        this.handleClickAddCategorie = this.handleClickAddCategorie.bind(this)
        this.handleDeleteCategorie = this.handleDeleteCategorie.bind(this)
    }

    componentDidMount () {
        this.getListCategorie()
    }

    getListCategorie () {
        fetch(proxyurl + baseUrl + '/categoriesByResto/' + this.state.idResto)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ categories: result })
                console.log(result)
            })
    }

    replaceModalItem (index) {
        this.setState({
            requiredItem: index,
            idCategorieSelected: this.state.categories[index].id
        })
    }

    saveModalDetails (item) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: item.nom, idMenu: this.state.idMenu })
        }

        fetch(proxyurl + baseUrl + '/categorie/' + this.state.idCategorieSelected, requestOptions)
            .then((response) => {
                response.json()
            })
            .then((result) => {
                // console.log(result)
                this.getListCategorie()
            })
        console.log(this.state.idCategorieSelected)
    }

    handleClickAddCategorie () {
        // console.log(JSON.stringify({ nom: this.state.nomCategorieToAdd, idMenu: this.state.idMenu }))
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: this.state.nomCategorieToAdd, idMenu: this.state.idMenu })
        }

        fetch(proxyurl + baseUrl + '/categorie', requestOptions)
            .then((response) => {
                response.json()
            })
            .then((result) => {
                this.getListCategorie()
            })
    }

    handleChangeCategorie (event) {
        this.setState({ nomCategorieToAdd: event.target.value })
    }

    handleChangeDeleteCat (idCategorie, i) {
        this.setState({ idCategorieTodelete: idCategorie })
    }

    handleDeleteCategorie () {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(proxyurl + baseUrl + '/categorie/' + this.state.idCategorieTodelete + '/' + this.state.idResto, requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    this.setState({ errorDelete: 'Vous ne pouvez pas supprimer cette catégorie car elle contient des produits !' })
                    // throw new Error(response.statusText)
                }
                return response.json()
            })
            .then((result) => {
                this.setState({ categories: result })
            })
    }

    render () {
        const requiredItem = this.state.requiredItem
        const modalData = this.state.categories[requiredItem]
        let nom
        modalData === undefined ? nom = '' : nom = modalData.nom
        // console.log(modalData)
        return (
            <div>
                <HeaderAppContainer />
                <div>
                    <div className='text-center'>
                        <h1>Liste des categories</h1>
                    </div>
                    <div>
                        <button type='button' className='btnAdd' data-toggle='modal' data-target='#modalAdd'>+</button>
                        <table className=' w-75 table table-striped'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Editer</th>
                                    <th scope='col'>Nom de la categorie</th>
                                    <th scope='col'>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories.map((categorie, i) =>
                                    <tr key={i}>
                                        <td><button type='button' className='btn btn-info btn-rounded btn-sm my-0' data-toggle='modal' data-target='#modalEdit' onClick={() => this.replaceModalItem(i)}>Editer</button></td>
                                        <td>{categorie.nom}</td>
                                        <td><button type='button' className='btn btn-danger btn-rounded btn-sm my-0' data-toggle='modal' data-target='#confirm-delete' onClick={() => this.handleChangeDeleteCat(categorie.id, i)}>Supprimer</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <ModalCategorie
                            nom={nom}
                            saveModalDetails={this.saveModalDetails}
                        />
                        <ModalAddCatgorie
                            onChangeNom={this.handleChangeCategorie}
                            onClickEnregistrer={this.handleClickAddCategorie}
                        />
                        <span>{this.state.errorDelete}</span>

                        <div className='modal fade' id='confirm-delete' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                            <div className='modal-dialog'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        Confirmation de suppression
                                    </div>
                                    <div className='modal-body'>
                                        Êtes-vous sûre de vouloir supprimer cette catégorie ?
                                    </div>
                                    <div className='modal-footer'>
                                        <button type='button' className='btn btn-default' data-dismiss='modal'>Annuler</button>
                                        <a className='btn btn-danger btn-ok' data-dismiss='modal' onClick={this.handleDeleteCategorie}>Supprimer</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div />
                    </div>
                </div>
            </div>
        )
    }
}

export default PageCategorieContainer
