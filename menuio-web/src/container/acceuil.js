import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
const baseUrl = 'https://menuio.herokuapp.com'
// const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''
var QRCode = require('qrcode.react')

class Acceuil extends Component {
    constructor () {
        super()
        this.state = {
            idUser: localStorage.getItem('idUser'),
            idResto: -1,
            idMenu: -1
        }
    }

    // Infos du resto à partir de IdUser
    componentDidMount () {
        fetch(proxyurl + baseUrl + '/menu/' + this.state.idUser)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                localStorage.setItem('idResto', result.idrestaurant)
                localStorage.setItem('idMenu', result.id)
                this.setState({idResto : result.idrestaurant})
            })
    }

    render () {
        return (
            <div>
                <HeaderAppContainer />

                <div className="text-center">
                    <h1>Votre Qr Code</h1>
                </div>

                <div className="text-center">
                    <QRCode value={'https://menuioweb.herokuapp.com/menu=' + this.state.idResto} />
                </div>
            </div>
        )
    }
}

export default Acceuil
