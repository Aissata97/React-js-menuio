import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'

class ModalCategorie extends Component {
    constructor (props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            nom: ''
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            nom: nextProps.nom
        })
    }

    NomHandler (e) {
        this.setState({ nom: e.target.value })
    }

    handleSave () {
        const item = this.state
        this.props.saveModalDetails(item)
    }

    render () {
        return (
            <div className='modal fade modalEditClass' id='modalEdit' tabIndex='-1' role='dialog' aria-hidden='true'>
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
                                <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Nom de la categorie</label>
                                <input type='text' id='formNameEdit' className='form-control validate' value={this.state.nom} onChange={(e) => this.NomHandler(e)} />
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
export default ModalCategorie
