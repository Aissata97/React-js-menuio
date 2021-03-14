import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class ModalEditProduitContainer extends Component {
    constructor () {
        super()
        this.state = {
            id: null,
            nom: '',
            description: '',
            prix: '',
            categorie: '',
            id_categorie: 0,
            url_image: null,
            idResto: localStorage.getItem('idResto'),
            categories: [],
            selectedFile: null
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            id: nextProps.id,
            nom: nextProps.nom,
            description: nextProps.description,
            prix: nextProps.prix,
            categorie: nextProps.categorie,
            id_categorie: nextProps.id_categorie,
            url_image: nextProps.url_image
        })
    }

    componentDidMount () {
        fetch(proxyurl + baseUrl + '/categoriesByResto/' + this.state.idResto)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({
                    categories: result
                })
            })
    }

    handleChangeNom (e) {
        this.setState({ nom: e.target.value })
    }

    handleChangeDescription (e) {
        this.setState({ description: e.target.value })
    }

    handleChangeCategorie (e) {
        this.setState({ id_categorie: e.target.value })
    }

    handleChangePrix (e) {
        this.setState({ prix: e.target.value })
    }

    handleChangeImage (e) {
        this.setState({ selectedFile: e.target.files[0] })
    }

    uploadImage (e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append(
            'file',
            this.state.selectedFile,
            this.state.selectedFile.name
        )

        const requestOptionsUpload = {
            method: 'POST',
            body: formData
        }

        fetch(proxyurl + baseUrl + '/storage/uploadFile', requestOptionsUpload)
            .then((response) => {
                return response.text()
            }).then((data) => {
                fetch(proxyurl + baseUrl + '/image-produit/' + this.state.id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'X-Requested-With'
                    },
                    body: JSON.stringify({ url_image: data })
                }).then((response2) => {
                    return response2.json()
                }).catch((error) => {
                    console.log(error)
                })
            })
    }

    handleSave () {
        const item = this.state
        this.props.saveModalDetails(item)
    }

    render () {
        return (
            <div className='modal fade modalEditClass' id='modalEditProduit' tabIndex='-1' role='dialog' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header text-center'>
                            <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>Formulaire de modification</h4>
                            <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body mx-3'>

                            <div className='md-form mb-5'>
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Choisissez une image pour le produit</label>
                                <input type='file' name='file' accept='image/*' className='form-control validate' onChange={(e) => this.handleChangeImage(e)} />
                                <div className='text-center'>
                                    <button type='button' onClick={(e) => this.uploadImage(e)}>Changer l'image</button>
                                </div>
                            </div>
                            <div className='md-form mb-5'>
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Nom</label>
                                <input type='text' id='formNameEdit' name='nom' className='form-control validate' onChange={(e) => this.handleChangeNom(e)} value={this.state.nom} />
                            </div>
                            <div className='md-form mb-5'>
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Description</label>
                                <input type='text' id='formNameEdit' name='description' className='form-control validate' onChange={(e) => this.handleChangeDescription(e)} value={this.state.description} />
                            </div>
                            <div className='md-form mb-5'>
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Prix</label>
                                <input type='number' id='formNameEdit' name='prix' className='form-control validate' onChange={(e) => this.handleChangePrix(e)} value={this.state.prix} required />
                            </div>
                            <div className='md-form mb-5'>
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Categorie</label>
                                <select value={this.state.id_categorie} name='categorie' id='categorie' className='form-control validate' onChange={(e) => this.handleChangeCategorie(e)}>

                                    {this.state.categories.map((categorie, i) =>
                                        <option value={categorie.id} key={i}>{categorie.nom}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='modal-footer d-flex justify-content-center editInsideWrapper'>
                            <button className='btn btn-outline-secondary btn-block editInside' data-dismiss='modal' onClick={() => { this.handleSave() }}>Enregistrer
                                <i className='fas fa-paper-plane-o ml-1' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditProduitContainer
