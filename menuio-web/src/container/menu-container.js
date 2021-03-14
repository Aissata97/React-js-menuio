import React, { Component } from 'react'
import TemplateClassicComponent from '../component/template-classique-component'
import TemplateModerneComponent from '../component/template-moderne-component'
import TemplateElegantComponent from '../component/template-elegant-component'
import ModalDetailProduit from '../container/modal-detail-produit-container'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class Menu extends Component {
    constructor () {
        super()
        this.state = {
            categories: [],
            produits: [],
            idRestaurant: localStorage.getItem('idResto'),
            idCategorieTrie: '',
            infoStyleMenu: {},
            currentCategorie: 0,
            urlLogoResto: '',
            produitSelected: {},
            idSelectedCategorie: '',
            produitsByCatgorie: []
        }

        this.handleReplaceModalItem = this.handleReplaceModalItem.bind(this)
        this.handleClickTrieCategorie = this.handleClickTrieCategorie.bind(this)
        this.handleClickAllCategories = this.handleClickAllCategories.bind(this)
        this.handleClickPanier = this.handleClickPanier.bind(this)
    }

    componentDidMount () {
        const { match: { params } } = this.props
        Promise.all([
            fetch(proxyurl + baseUrl + '/categoriesByResto/' + params.idResto),
            fetch(proxyurl + baseUrl + '/produits-order-by-cat/' + params.idResto),
            fetch(proxyurl + baseUrl + '/infostylemenu/' + params.idResto),
            fetch(proxyurl + baseUrl + '/restaurant-by-id/' + params.idResto)

        ])
            .then(([response1, response2, response3, response4]) => Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]))
            .then(([data1, data2, data3, data4]) => this.setState({
                categories: data1,
                produits: data2,
                infoStyleMenu: data3,
                urlLogoResto: data4.url_logo
            }))
    }

    handleReplaceModalItem (e) {
        const index = e.target.id
        const divIndex = e.target.name
        this.setState({
            produitSelected: this.state.produits[divIndex].produits[index]
        })
    }

    handleClickAllCategories () {
        this.setState({ idCategorieTrie: '' })
    }

    handleClickTrieCategorie (e) {
        e.preventDefault()
        this.setState({ idCategorieTrie: e.currentTarget.id })
        fetch(proxyurl + baseUrl + '/produits-by-categorie-id/' + e.currentTarget.id)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ produitsByCatgorie: result })
            })
    }

    handleClickPanier(){
        this.props.history.push('/panier')
    }

    render () {
        const modalData = this.state.produitSelected
        let listProduits
        this.state.idCategorieTrie !== '' ? listProduits = this.state.produitsByCatgorie : listProduits = this.state.produits
        //console.log(this.state.idCategorieTrie)

        if (this.state.infoStyleMenu.id_template === 1) {
            return (
                <div>
                    <TemplateClassicComponent
                        colorTitreProd={this.state.infoStyleMenu.couleur_titre_produits}
                        bgTemplate={this.state.infoStyleMenu.couleur_background_template}
                        colorTitreCat={this.state.infoStyleMenu.couleur_titre_categorie}
                        colorTitreNav={this.state.infoStyleMenu.couleur_titre_navigation}
                        colorBouton={this.state.infoStyleMenu.couleur_boutons}
                        bgHeader={this.state.infoStyleMenu.couleur_background_header}
                        colorPrix={this.state.infoStyleMenu.couleur_text_prix}
                        colorTextBtn={this.state.infoStyleMenu.couleur_text_boutons}
                        bgNavigationCat={this.state.infoStyleMenu.couleur_background_navigation_cat}
                        categories={this.state.categories}
                        produits={listProduits}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                        onClickPlusDetail={this.handleReplaceModalItem}
                        onClickCategorie={this.handleClickTrieCategorie}
                        onClickAllCategories={this.handleClickAllCategories}
                        onClickPanier={this.handleClickPanier}

                    />
                    <ModalDetailProduit
                        id={modalData === undefined ? '' : modalData.id}
                        nom={modalData === undefined ? '' : modalData.nom}
                        description={modalData === undefined ? '' : modalData.description}
                        prix={modalData === undefined ? '' : modalData.prix}
                    />
                </div>

            )
        } else if (this.state.infoStyleMenu.id_template === 2) {
            return (
                <div>
                    <TemplateElegantComponent
                        categories={this.state.categories}
                        produits={listProduits}
                        colorTitreProd={this.state.infoStyleMenu.couleur_titre_produits}
                        bgTemplate={this.state.infoStyleMenu.couleur_background_template}
                        colorTitreCat={this.state.infoStyleMenu.couleur_titre_categorie}
                        colorTitreNav={this.state.infoStyleMenu.couleur_titre_navigation}
                        colorBouton={this.state.infoStyleMenu.couleur_boutons}
                        bgHeader={this.state.infoStyleMenu.couleur_background_header}
                        colorPrix={this.state.infoStyleMenu.couleur_text_prix}
                        colorTextBtn={this.state.infoStyleMenu.couleur_text_boutons}
                        bgNavigationCat={this.state.infoStyleMenu.couleur_background_navigation_cat}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                        onClickPlusDetail={this.handleReplaceModalItem}
                        onClickCategorie={this.handleClickTrieCategorie}
                        onClickAllCategories={this.handleClickAllCategories}
                        onClickPanier={this.handleClickPanier}
                    />
                    <ModalDetailProduit
                        id={modalData === undefined ? '' : modalData.id}
                        nom={modalData === undefined ? '' : modalData.nom}
                        description={modalData === undefined ? '' : modalData.description}
                        prix={modalData === undefined ? '' : modalData.prix}
                    />
                </div>

            )
        } else {
            return (
                <div>
                    <TemplateModerneComponent
                        categories={this.state.categories}
                        produits={listProduits}
                        colorTitreProd={this.state.infoStyleMenu.couleur_titre_produits}
                        bgTemplate={this.state.infoStyleMenu.couleur_background_template}
                        colorTitreCat={this.state.infoStyleMenu.couleur_titre_categorie}
                        colorTitreNav={this.state.infoStyleMenu.couleur_titre_navigation}
                        colorBouton={this.state.infoStyleMenu.couleur_boutons}
                        bgHeader={this.state.infoStyleMenu.couleur_background_header}
                        colorPrix={this.state.infoStyleMenu.couleur_text_prix}
                        colorTextBtn={this.state.infoStyleMenu.couleur_text_boutons}
                        bgNavigationCat={this.state.infoStyleMenu.couleur_background_navigation_cat}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                        onClickPlusDetail={this.handleReplaceModalItem}
                        onClickCategorie={this.handleClickTrieCategorie}
                        onClickAllCategories={this.handleClickAllCategories}
                        onClickPanier={this.handleClickPanier}
                    />
                    <ModalDetailProduit
                        id={modalData === undefined ? '' : modalData.id}
                        nom={modalData === undefined ? '' : modalData.nom}
                        description={modalData === undefined ? '' : modalData.description}
                        prix={modalData === undefined ? '' : modalData.prix}
                    />
                </div>

            )
        }
    }
}

export default Menu
