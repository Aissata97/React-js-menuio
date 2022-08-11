import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import InscriptionFormContainer from '../container/inscription-form-container'
import InscriptionRestoFormContainer from '../container/inscription-resto-form-container'
import Acceuil from '../container/acceuil'
import ConnexionContainer from '../container/connexion-container'
import QrCodePage from '../container/qr-code-page-container'
import ProfilUserContainer from '../container/profil-user-container'
import ChoixTemplateContainer from '../container/choix-template-container'
import ServeurContainer from '../container/serveur-container'
import PersonnalisationMenu from '../container/personnalisation-menu'
import Menu from '../container/menu-container'
import PageCategorieContainer from '../container/admin-page-categorie'
import PageProduitContainer from '../container/admin-page-produit'
import PanierContainer from '../container/page-panier-container'
import AccueilPrincipal from './accueil-principal'
/* */
// import TemplateClassicContainer from '../component/template-classique-component'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={AccueilPrincipal} />
            <Route exact path='https://menuiobyaissata.netlify.app/inscription' component={InscriptionFormContainer} />
            <Route path='/inscription/:id' component={InscriptionRestoFormContainer} />
            <Route exact path='/connexion' component={ConnexionContainer} />
            <Route path='/acceuil' component={Acceuil} />
            <Route path='/qrcode' component={QrCodePage} />
            <Route path='/profil/:nom' component={ProfilUserContainer} />
            <Route path='/serveur' component={ServeurContainer} />
            <Route path='/personnalisation/:idResto' component={PersonnalisationMenu} />
            <Route path='/choix-template' component={ChoixTemplateContainer} />
            <Route path='/menu=:idResto' component={Menu} />
            <Route path='/page-categorie' component={PageCategorieContainer} />
            <Route path='/page-produit' component={PageProduitContainer} />
            <Route path='/panier' component={PanierContainer} />
        </Switch>

    </BrowserRouter>
)

export default App
