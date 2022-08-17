import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import HeaderAppContainer from '../container/header-app-container'
import TemplateClassicComponent from '../component/template-classique-component'
import TemplateElegantComponent from '../component/template-elegant-component'
import TemplateModerneComponent from '../component/template-moderne-component'
import ModalSetLogo from '../component/modal-set-logo-component'
import '../css/page-personnalisation.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class PersonnalisationMenu extends Component {
    constructor () {
        super()
        this.state = {
            idResto: localStorage.getItem('idResto'),
            styleMenu: {},
            dataToSendStyleMenu: {},
            styleMenuTemp: {},
            openCollapse: false,
            categories: [],
            produits: [],
            selectedLogo: null,
            urlLogoResto: ''
        }

        this.handleGoPageCategorie = this.handleGoPageCategorie.bind(this)
        this.handleGoPageProduit = this.handleGoPageProduit.bind(this)
        this.handleSaveStyleMenu = this.handleSaveStyleMenu.bind(this)
        this.MenuTemp = this.MenuTemp.bind(this)
        this.handleChangeImgLogo = this.handleChangeImgLogo.bind(this)
        this.handleSubmitLogo = this.handleSubmitLogo.bind(this)
    }

    componentDidMount () {
        Promise.all([
            fetch(proxyurl + baseUrl + '/categoriesByResto/' + this.state.idResto),
            fetch(proxyurl + baseUrl + '/produits-order-by-cat/' + this.state.idResto),
            fetch(proxyurl + baseUrl + '/infostylemenu/' + this.state.idResto),
            fetch(proxyurl + baseUrl + '/restaurant-by-id/' + this.state.idResto)

        ])
            .then(([response1, response2, response3, response4]) => Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]))
            .then(([data1, data2, data3, data4]) => this.setState({
                categories: data1,
                produits: data2,
                styleMenu: data3,
                urlLogoResto: data4.url_logo
            }))
    }

    handleGoPageCategorie () {
        this.props.history.push('/page-categorie')
    }

    handleGoPageProduit () {
        this.props.history.push('/page-produit')
    }

    handleChangeStyleMenuTemp (field, event) {
        const styleMenuTemp = this.state.styleMenuTemp
        styleMenuTemp[field] = event.target.value
        this.setState({ styleMenuTemp })
        // console.log(styleMenuTemp)
    }

    handleSaveStyleMenu () {
        const styleMenuTemp = this.state.styleMenuTemp
        const styleMenu = this.state.styleMenu
        const bgHeader = styleMenuTemp.couleur_background_header === null ? styleMenu.couleur_background_header : styleMenuTemp.couleur_background_header
        const colorTitreNav = styleMenuTemp.couleur_titre_navigation === null ? styleMenu.couleur_titre_navigation : styleMenuTemp.couleur_titre_navigation
        const colorTitreCat = styleMenuTemp.couleur_titre_categorie === null ? styleMenu.couleur_titre_categorie : styleMenuTemp.couleur_titre_categorie
        const colorTitreProd = styleMenuTemp.couleur_titre_produits === null ? styleMenu.couleur_titre_produits : styleMenuTemp.couleur_titre_produits
        const bgTemplate = styleMenuTemp.couleur_background_template === null ? styleMenu.couleur_background_template : styleMenuTemp.couleur_background_template
        const colorBouton = styleMenuTemp.couleur_boutons === null ? styleMenu.couleur_boutons : styleMenuTemp.couleur_boutons
        const colorTextBtn = styleMenuTemp.couleur_text_boutons === null ? styleMenu.couleur_text_boutons : styleMenuTemp.couleur_text_boutons
        const colorPrix = styleMenuTemp.couleur_text_prix === null ? styleMenu.couleur_text_prix : styleMenuTemp.couleur_text_prix
        const bgNavigationCat = styleMenuTemp.couleur_background_navigation_cat === null ? styleMenu.couleur_background_navigation_cat : styleMenuTemp.couleur_background_navigation_cat
        const dataToSend = { couleur_titre_navigation: colorTitreNav, couleur_titre_categorie: colorTitreCat, couleur_titre_produits: colorTitreProd, couleur_background_header: bgHeader, couleur_background_template: bgTemplate, couleur_boutons: colorBouton, couleur_text_boutons: colorTextBtn, couleur_text_prix: colorPrix, couleur_background_navigation_cat: bgNavigationCat }

        // console.log(JSON.stringify(dataToSend))
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        }

        fetch(proxyurl + baseUrl + '/style_menu/' + this.state.styleMenu.id, requestOptions)
            .then((response) => {
                response.json()
            })
            .then((result) => {
                toast.success('Modification réussie !')
            })
    }

    handleChangeImgLogo (e) {
        this.setState({ selectedLogo: e.target.files[0] })
    }

    handleSubmitLogo (e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append(
            'file',
            this.state.selectedLogo,
            this.state.selectedLogo.name
        )
        const requestOptionsUpload = {
            method: 'POST',
            body: formData
        }

        fetch(proxyurl + baseUrl + '/storage/uploadFile', requestOptionsUpload)
            .then((response) => {
                return response.text()
            }).then((data) => {
                fetch(proxyurl + baseUrl + '/logo/' + this.state.idResto, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'X-Requested-With'
                    },
                    body: JSON.stringify({ url_logo: data })
                }).then((response2) => {
                    return response2.json()
                }).then((data2) => {
                    this.setState({ urlLogoResto: data2.url_logo })
                }).catch((error) => {
                    console.log(error)
                })
            })
    }

    MenuTemp () {
        const styleMenuTemp = this.state.styleMenuTemp
        const styleMenu = this.state.styleMenu

        const bgHeader = styleMenuTemp.couleur_background_header === null || styleMenuTemp.couleur_background_header === undefined ? styleMenu.couleur_background_header : styleMenuTemp.couleur_background_header
        const colorTitreNav = styleMenuTemp.couleur_titre_navigation === null || styleMenuTemp.couleur_titre_navigation === undefined ? styleMenu.couleur_titre_navigation : styleMenuTemp.couleur_titre_navigation
        const colorTitreCat = styleMenuTemp.couleur_titre_categorie === null || styleMenuTemp.couleur_titre_categorie === undefined ? styleMenu.couleur_titre_categorie : styleMenuTemp.couleur_titre_categorie
        const colorTitreProd = styleMenuTemp.couleur_titre_produits === null || styleMenuTemp.couleur_titre_produits === undefined ? styleMenu.couleur_titre_produits : styleMenuTemp.couleur_titre_produits
        const bgTemplate = styleMenuTemp.couleur_background_template === null || styleMenuTemp.couleur_background_template === undefined ? styleMenu.couleur_background_template : styleMenuTemp.couleur_background_template
        const colorBouton = styleMenuTemp.couleur_boutons === null || styleMenuTemp.couleur_boutons === undefined ? styleMenu.couleur_boutons : styleMenuTemp.couleur_boutons
        const colorPrix = styleMenuTemp.couleur_text_prix === null || styleMenuTemp.couleur_text_prix === undefined ? styleMenu.couleur_text_prix : styleMenuTemp.couleur_text_prix
        const colorTextBtn = styleMenuTemp.couleur_text_boutons === null || styleMenuTemp.couleur_text_boutons === undefined ? styleMenu.couleur_text_boutons : styleMenuTemp.couleur_text_boutons
        const bgNavigationCat = styleMenuTemp.couleur_background_navigation_cat === null || styleMenuTemp.couleur_background_navigation_cat === undefined ? styleMenu.couleur_background_navigation_cat : styleMenuTemp.couleur_background_navigation_cat
        if (this.state.styleMenu.id_template === 1) {
            return (
                <div>
                    <TemplateClassicComponent
                        colorTitreProd={colorTitreProd}
                        bgTemplate={bgTemplate}
                        colorTitreNav={colorTitreNav}
                        colorTitreCat={colorTitreCat}
                        colorBouton={colorBouton}
                        bgHeader={bgHeader}
                        colorPrix={colorPrix}
                        colorTextBtn={colorTextBtn}
                        bgNavigationCat={bgNavigationCat}
                        categories={this.state.categories}
                        produits={this.state.produits}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                    />
                </div>
            )
        } else if (this.state.styleMenu.id_template === 2) {
            return (
                <div>
                    <TemplateElegantComponent
                        categories={this.state.categories}
                        produits={this.state.produits}
                        colorTitreProd={colorTitreProd}
                        bgTemplate={bgTemplate}
                        colorTitreNav={colorTitreNav}
                        colorTitreCat={colorTitreCat}
                        colorBouton={colorBouton}
                        bgHeader={bgHeader}
                        colorPrix={colorPrix}
                        colorTextBtn={colorTextBtn}
                        bgNavigationCat={bgNavigationCat}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <TemplateModerneComponent
                        categories={this.state.categories}
                        produits={this.state.produits}
                        colorTitreProd={colorTitreProd}
                        bgTemplate={bgTemplate}
                        colorTitreNav={colorTitreNav}
                        colorTitreCat={colorTitreCat}
                        colorBouton={colorBouton}
                        bgHeader={bgHeader}
                        colorPrix={colorPrix}
                        colorTextBtn={colorTextBtn}
                        bgNavigationCat={bgNavigationCat}
                        logo={'https://aissatabucket.s3.amazonaws.com/' + this.state.urlLogoResto}
                    />
                </div>
            )
        }
    }

    render () {
        const bgHeaderTemp = this.state.styleMenuTemp.couleur_background_header
        const colorTitreNav = this.state.styleMenuTemp.couleur_titre_navigation
        const colorTitreCat = this.state.styleMenuTemp.couleur_titre_categorie
        const colorTitreProd = this.state.styleMenuTemp.couleur_titre_produits
        const bgTemplateTemp = this.state.styleMenuTemp.couleur_background_template
        const colorBouton = this.state.styleMenuTemp.couleur_boutons
        const colorTextPrix = this.state.styleMenuTemp.couleur_text_prix
        const bgNavigationCat = this.state.styleMenuTemp.couleur_background_navigation_cat
        const colorTextBtn = this.state.styleMenuTemp.couleur_text_boutons
        const styleMenu = this.state.styleMenu

        /// ////// Template

        return (

            <div className='personnalisation-container'>
                <HeaderAppContainer />

                <div>
                    <div className='text-center'>
                        <h1>Personnalisez le template du menu de votre restaurant</h1>
                    </div>

                    <div className='personalisation-main-div'>
                        <div className='cat-prod'>
                            <div>
                                <button type='button' className='btn btn-light' onClick={this.handleGoPageCategorie}>Aller à la page Categorie</button>
                            </div>

                            <div>
                                <button type='button' className='btn btn-light' onClick={this.handleGoPageProduit}>Aller à la page produit</button>
                            </div>

                            <div>
                                <button type='button' className='btn btn-light' data-toggle='modal' data-target='#modalSetLogo' onClick={this.handleSetLogo}>modifier le logo</button>
                            </div>

                            <div>
                                <button type='button' className='btn btn-light' onClick={this.handleSaveStyleMenu}>Enregistrer</button>
                                <ToastContainer autoClose={2000} />
                            </div>
                        </div>

                        <div className='menu'>
                            <this.MenuTemp />
                        </div>

                        <div className='style-div'>
                            <div>
                                <p> couleur de font de l'entête de la page</p>
                                <input type='color' value={bgHeaderTemp == null ? styleMenu.couleur_background_header : bgHeaderTemp} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_background_header')} />
                            </div>
                            <div>
                                <p>Couleur de la liste categories </p>
                                <input type='color' value={colorTitreNav == null ? styleMenu.couleur_titre_navigation : colorTitreNav} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_titre_navigation')} />
                            </div>

                            <div>
                                <p>couleur de fond de la liste des categories</p>
                                <input type='color' value={bgNavigationCat == null ? styleMenu.couleur_background_navigation_cat : bgNavigationCat} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_background_navigation_cat')} />
                            </div>

                            <div>
                                <p>Couleur d'une categorie</p>
                                <input type='color' value={colorTitreCat == null ? styleMenu.couleur_titre_categorie : colorTitreCat} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_titre_categorie')} />
                            </div>

                            <div>
                                <p>Couleur du nom des produits</p>
                                <input type='color' value={colorTitreProd == null ? styleMenu.couleur_titre_produits : colorTitreProd} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_titre_produits')} />
                            </div>

                            <div>
                                <p>Couleur des prix</p>
                                <input type='color' value={colorTextPrix == null ? styleMenu.couleur_text_prix : colorTextPrix} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_text_prix')} />
                            </div>

                            <div>
                                <p>Couleur de fond du menu</p>
                                <input type='color' value={bgTemplateTemp == null ? styleMenu.couleur_background_template : bgTemplateTemp} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_background_template')} />
                            </div>

                            <div>
                                <p>Couleur de text des boutons</p>
                                <input type='color' value={colorTextBtn == null ? styleMenu.couleur_text_boutons : colorTextBtn} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_text_boutons')} />
                            </div>
                            <div>
                                <p>Couleur de fond des boutons</p>
                                <input type='color' value={colorBouton == null ? styleMenu.couleur_boutons : colorBouton} onChange={this.handleChangeStyleMenuTemp.bind(this, 'couleur_boutons')} />
                            </div>

                        </div>

                    </div>

                    <ModalSetLogo
                        onChangeImg={this.handleChangeImgLogo}
                        onClickSaveLogo={this.handleSubmitLogo}
                    />
                </div>
            </div>
        )
    }
}

export default PersonnalisationMenu
