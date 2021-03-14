import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'

var QRCode = require('qrcode.react')

class QrCodePage extends Component {
    constructor () {
        super()
        this.state = {
            urlQrCode: null,
            idUser: localStorage.getItem('idUser'),
            idResto: localStorage.getItem('idResto')
        }
    }

    render () {
        return (
            <div>

                <HeaderAppContainer />

                <div className='text-center'>
                    <QRCode value={'https://menuio-web.herokuapp.com/menu=' + this.state.idResto} />
                </div>

            </div>
        )
    }
}

export default QrCodePage
