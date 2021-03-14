import React, { Component } from 'react'
import '../css/panier.css'

class PanierContainer extends Component {
    
    constructor(){
        super()
        this.state = {
            panier: localStorage['panier'] == null || localStorage['panier'] === undefined ? [] : JSON.parse(localStorage['panier'])
        }
        this.handleClickVider = this.handleClickVider.bind(this)
        //this.handleSupprimer(id) = this.handleSupprimer.bind(this)
    }
    
    handleClickVider(){
        this.setState({panier : []})
        localStorage.removeItem('panier')
    }

    handleSupprimer(index){
        const panier = this.state.panier
        panier.splice(index, 1)
        this.setState({ panier : panier})
        localStorage.setItem('panier', JSON.stringify(panier))
    }

    render(){
        //console.log(this.state.panier[0].produit.nom)
        if (this.state.panier === null){
            return (
                <div>
                    <div className="text-center">
                        <h2>Votre panier est vide</h2>
                    </div>
                </div>
            )
        }else{
        return(
            <div>
                <div className="text-center">
                    <h1>Votre panier</h1>
                </div>

                <div>
                    <table className='table table-striped'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'> </th>
                                <th scope='col'>Produit</th>
                                <th scope='col'>Quantité</th>
                                <th scope='col'>Instruction au cuisinier</th>
                                <th scope='col'>Prix total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.panier.map((item, i) =>
                                    <tr key={i}>
                                        <td><button type='button' onClick={() => this.handleSupprimer(i)}>X</button></td>
                                        <td>{item.produit.nom}</td>
                                        <td>{item.quantite}</td>
                                        <td>{item.instruction}</td>
                                        <td>{Number(item.prix) * Number(item.quantite)}</td>
                                    </tr>
                        )}
                        </tbody>
                    </table>

                    <div className="text-center">
                        <button className="btn btn-dark" type="button" onClick={this.handleClickVider}>Vider le panier</button>
                        <button className="btn btn-dark" type="button">Envoyer la commande</button>
                    </div>
                </div>
                
            </div>

        )
                        }
    }
}

export default PanierContainer