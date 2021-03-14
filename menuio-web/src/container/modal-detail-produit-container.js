import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'

class ModalDetailProduit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: -1,
            nom: '',
            description: '',
            prix: 0,
            quantite: 1,
            instruction: '',
            panier: localStorage.getItem('panier') === null || localStorage.getItem('panier') === undefined ? [] : JSON.parse(localStorage.getItem('panier'))
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            id: nextProps.id,
            nom: nextProps.nom,
            description: nextProps.description,
            prix: nextProps.prix
        })
    }

    handleChangeDescription(e){
        this.setState({instruction : e.target.value})
    }


    handleChangeQuantite(e){
        this.setState({quantite : e.target.value})
    }

    handleClickAjoutPanier(e){
        e.preventDefault()
        const produit = this.props
        const panier = this.state.panier
        let produitDansPanier = panier.find(
            (item) => produit.id === item.produit.id
        )

        if (produitDansPanier){
            produitDansPanier.quantite = this.state.quantite
        }else{
            produitDansPanier = {
                produit,
                quantite: this.state.quantite,
                instruction: this.state.instruction,
                prix: this.state.prix
            }
            panier.push(produitDansPanier)
        }

        this.setState({panier : panier})
        localStorage.setItem(['panier'], JSON.stringify(panier))
    }

    render () {
        return (
            <div className='modal fade modalEditClass' id='modalDetailProduit' tabIndex='-1' role='dialog' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header text-center'>
                            <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>{this.state.nom}</h4>
                            <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>

                        <div className='modal-body'>
                            <p>{this.state.description}</p>
                            <div>
                                <label>Quantité</label>
                                <input type='number' name='quantite' id='quantite' min='1' max='10' value={this.state.quantite} onChange={(e) => this.handleChangeQuantite(e)} />
                            </div>
                            <div>
                                <label>Instruction</label><br />
                                <textarea rows='4' cols='80%' name='description' onChange={(e) => this.handleChangeDescription(e)}/>
                            </div>

                            <input type='submit' value='Ajouter au panier' onClick={(e) => this.handleClickAjoutPanier(e)} data-dismiss='modal'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDetailProduit
