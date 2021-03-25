import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
import '../css/pageCategorie.css'
import ModalEditProduitContainer from '../container/modal-edit-produit-container'
import ModalAddProduit from '../component/modal-add-produit-component'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class PageProduitContainer extends Component {
    constructor () {
        super()
        this.state = {
            produits: [],
            requiredItem: 0,
            valuesAddForm: {},
            idMenu: null,
            categories: [],
            idResto: localStorage.getItem('idResto'),
            idProduitToDelete: -1,
            selectedImageProduit: null,
            urlSelectedImageProduit: ''
        }
        this.replaceModalItem = this.replaceModalItem.bind(this)
        this.saveModalDetails = this.saveModalDetails.bind(this)
        this.handleChangeAddForm = this.handleChangeAddForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDeleteProduit = this.handleDeleteProduit.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }

    componentDidMount () {
        // this.getListProduit()
        Promise.all([
            fetch(proxyurl + baseUrl + '/categoriesByResto/' + this.state.idResto),
            fetch(proxyurl + baseUrl + '/produits-by-resto/' + this.state.idResto)

        ])
            .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
            .then(([categories, produits]) => this.setState({
                categories: categories,
                idMenu: categories[0].idMenu,
                produits: produits
            }))
    }

    replaceModalItem (index) {
        this.setState({
            requiredItem: index
        })
    }

    getListProduit () {
        fetch(proxyurl + baseUrl + '/produits-by-resto/' + this.state.idResto)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ produits: result })
            })
    }

    saveModalDetails (item) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: item.nom, description: item.description, prix: item.prix, url_image: item.url_image.name, idCategorie: Number(item.id_categorie) })
        }

        // console.log(JSON.stringify({ nom: item.nom, description: item.description, prix: item.prix, url_image: item.url_image.name, idCategorie: Number(item.id_categorie) }))
        fetch(proxyurl + baseUrl + '/produit/' + item.id, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.getListProduit()
            })
    }

    handleChangeAddForm (e) {
        this.setState({
            valuesAddForm: Object.assign(this.state.valuesAddForm, { [e.target.name]: e.target.value })
        })
    }

    handleDeleteProduit () {
        this.setState({})
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(proxyurl + baseUrl + '/produits/' + this.state.idProduitToDelete + '/' + this.state.idResto, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                // this.getListProduit()
                this.setState({ produits: result })
            })
    }

    handleChangeImage (e) {
        this.setState({ selectedImageProduit: e.target.files[0] })
    }

    handleSubmit (e) {
        e.preventDefault()
        const valuesAddForm = this.state.valuesAddForm
        const idMenu = this.state.idMenu
        const formData = new FormData()

        const requestOptionsAddProduit = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: valuesAddForm.nom, description: valuesAddForm.description, prix: Number(valuesAddForm.prix), idCategorie: Number(valuesAddForm.idCategorie), idMenu: Number(idMenu) })
        }
        if (this.state.selectedImageProduit !== null) {
            formData.append(
                'file',
                this.state.selectedImageProduit,
                this.state.selectedImageProduit.name
            )

            const requestOptionsUploadImage = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }

            fetch(proxyurl + baseUrl + '/storage/uploadFile', requestOptionsUploadImage)
                .then((response) => {
                    return response.text()
                }).then((data) => {
                    fetch(proxyurl + baseUrl + '/ajout/produit/' + this.state.idResto, {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            
                        },
                        body: JSON.stringify({ nom: valuesAddForm.nom, description: valuesAddForm.description, prix: Number(valuesAddForm.prix), idCategorie: Number(valuesAddForm.idCategorie), idMenu: Number(idMenu), url_image: data })
                    }
                    )
                        .then((response2) => {
                            return response2.json()
                        }).then((data2) => {
                            this.setState({ produits: data2 })
                        }).catch((error) => {
                            console.log(error)
                        })
                })
        } else {
            fetch(proxyurl + baseUrl + '/ajout/produit/' + this.state.idResto, requestOptionsAddProduit)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    this.setState({ produits: result })
                })
        }
    }

    handleChangeDelete (idProduit, i) {
        this.setState({ idProduitToDelete: idProduit })
    }

    render () {
        const requiredItem = this.state.requiredItem
        const modalData = this.state.produits[requiredItem]

        return (
            <div>
                <HeaderAppContainer />
                <div className='text-center'>
                    <h1>Liste des produits</h1>
                </div>
                <div>
                    <button type='button' className='btnAdd' data-toggle='modal' data-target='#modalAddProduit'>+</button>
                    <table className=' w-75 table table-striped'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>Editer</th>
                                <th scope='col'>Image</th>
                                <th scope='col'>Nom</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Prix</th>
                                <th scope='col'>Categorie</th>
                                <th scope='col'>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produits.map((produit, i) =>
                                <tr key={i}>
                                    <td><button type='button' className='btn btn-info btn-rounded btn-sm my-0' data-toggle='modal' data-target='#modalEditProduit' onClick={() => this.replaceModalItem(i)}>Editer</button></td>
                                    <td><img src={'https://aissatabucket.s3.amazonaws.com/' + produit.url_image} alt={'image de ' + produit.nom} /></td>
                                    <td>{produit.nom}</td>
                                    <td>{produit.description}</td>
                                    <td>{produit.prix}</td>
                                    <td value={produit.id_categorie}>{produit.nom_categorie}</td>
                                    <td><button type='button' className='btn btn-danger btn-rounded btn-sm my-0' data-toggle='modal' data-target='#confirm-delete' onClick={() => this.handleChangeDelete(produit.id, i)}>Supprimer</button></td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                    <ModalEditProduitContainer
                        id={modalData === undefined ? '' : modalData.id}
                        nom={modalData === undefined ? '' : modalData.nom}
                        description={modalData === undefined ? '' : modalData.description}
                        prix={modalData === undefined ? '' : modalData.prix}
                        categorie={modalData === undefined ? '' : modalData.nom_categorie}
                        id_categorie={modalData === undefined ? '' : modalData.id_categorie}
                        url_image={modalData === undefined ? '' : modalData.url_image}
                        saveModalDetails={this.saveModalDetails}
                    />

                    <ModalAddProduit
                        categories={this.state.categories}
                        onChange={this.handleChangeAddForm}
                        onClickEnregistrer={this.handleSubmit}
                        onChangeImage={this.handleChangeImage}
                    />
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
                                    <a className='btn btn-danger btn-ok' data-dismiss='modal' onClick={this.handleDeleteProduit}>Supprimer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PageProduitContainer
