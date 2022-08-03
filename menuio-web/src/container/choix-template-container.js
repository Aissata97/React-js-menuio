import React, { Component } from 'react'
import HeaderAppContainer from '../container/header-app-container'
import '../css/template.css'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = 'https://menuio.herokuapp.com'
//const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const proxyurl = ''

class ChoixTemplateContainer extends Component {
    constructor () {
        super()
        this.state = {
            idStyleMenu: '',
            idRestaurant: localStorage.getItem('idResto'),
            idTemplateSelected: null
        }

        this.handleClickClassic = this.handleClickClassic.bind(this)
        this.handleClickElegant = this.handleClickElegant.bind(this)
        this.handleClickModerne = this.handleClickModerne.bind(this)
    }

    handleClickClassic () {
        this.setTemplate(1)
    }

    handleClickElegant () {
        this.setTemplate(2)
    }

    handleClickModerne () {
        this.setTemplate(3)
    }

    componentDidMount () {
        fetch(proxyurl + baseUrl + '/infostylemenu/' + this.state.idRestaurant)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({ idStyleMenu: result.id })
            })
    }

    setTemplate (idTemplate) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_template: idTemplate })
        }
        fetch(proxyurl + baseUrl + '/modifier-template/' + this.state.idStyleMenu, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.props.history.push('/personnalisation/' + this.state.idStyleMenu)
            })
    }

    render () {
        return (
            <div>
                <HeaderAppContainer />

                <div className='text-center'>
                    <p>Choisissez un template pour le menu de votre restaurant</p>
                </div>

                <div className='main-div'>
                    <div className='container'>
                        <h3>Classic</h3>
                        <img src='https://aissatabucket.s3.amazonaws.com/classic.png' alt='template classic' className='image' />
                        <div className='middle'>
                            <button className='btnChoix btn btn-primary' type='button' onClick={this.handleClickClassic}>Choisir ce template</button>
                        </div>
                    </div>
                    <div className='container'>
                        <h3>Elegant</h3>
                        <img src='https://aissatabucket.s3.amazonaws.com/elegant.png' alt='template elegant' className='image' />
                        <div className='middle'>
                            <button className='btnChoix btn btn-primary' type='button' onClick={this.handleClickElegant}>Choisir ce template</button>
                        </div>
                    </div>
                    <div className='container'>
                        <h3>Moderne</h3>
                        <img src='https://aissatabucket.s3.amazonaws.com/moderne.png' alt='template moderne' className='image' />
                        <div className='middle'>
                            <button className='btnChoix btn btn-primary' type='button' onClick={this.handleClickModerne}>Choisir ce template</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChoixTemplateContainer
