import React from 'react'
import 'bootstrap/js/dist/modal'
import InputComponent from '../component/input-component'

const ModalAddServeur = ({ onChange, onClickEnregistrer, errorMdp, errorTel, dataDissmissAdd }) => (
    <div>

        <div className='modal fade modalEditClass' id='modalAddServeur' tabIndex='-1' role='dialog' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header text-center'>
                        <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>Ajout de serveur</h4>
                        <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <div>
                        <form onSubmit={onClickEnregistrer} className='modal-body mx-3'>
                            <InputComponent
                                id='nom'
                                name='nom'
                                type='text'
                                text='Nom du serveur '
                                onChange={onChange}
                                required
                                classNameDiv='form-group'
                            />

                            <InputComponent
                                id='prenom'
                                name='prenom'
                                type='text'
                                text='Prenom du serveur '
                                onChange={onChange}
                                required
                                classNameDiv='form-group'
                            />

                            <InputComponent
                                id='email'
                                name='email'
                                type='email'
                                text='E-mail du serveur'
                                onChange={onChange}
                                required
                                classNameDiv='form-group'
                            />

                            <InputComponent
                                id='telephone'
                                name='telephone'
                                type='tel'
                                text='Téléphone du serveur'
                                onChange={onChange}
                                classNameDiv='form-group'
                            />
                            <span>{errorTel}</span>

                            <InputComponent
                                id='addresse'
                                name='addresse'
                                type='text'
                                text='Addresse du serveur'
                                onChange={onChange}
                                required
                                classNameDiv='form-group'
                            />

                            <InputComponent
                                id='passwords'
                                name='passwords'
                                type='password'
                                text='Mot de passe'
                                onChange={onChange}
                                required='true'
                                classNameDiv='form-group'
                            />

                            <InputComponent
                                id='password2'
                                name='password2'
                                type='password'
                                text='Mot de passe de confirmation'
                                classNameDiv='form-group'
                                onChange={onChange}
                            />
                            <span>{errorMdp}</span>

                            <div className='text-center'>
                                <input type='submit' value='Ajouter' />
                            </div>
                        </form>
                    </div>

                    <div className='modal-footer d-flex justify-content-center editInsideWrapper'>
                        <button className='btn btn-outline-secondary btn-block editInside' data-dismiss='modal'>Fermer
                            <i className='fas fa-paper-plane-o ml-1' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ModalAddServeur
