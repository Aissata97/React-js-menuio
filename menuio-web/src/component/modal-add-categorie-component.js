import React from 'react'

const ModalAddCatgorie = ({ onChangeNom, onClickEnregistrer }) => (
    <div>
        <div className='modal fade modalEditClass' id='modalAdd' tabIndex='-1' role='dialog' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header text-center'>
                        <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>Formulaire d'ajout</h4>
                        <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body mx-3'>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameAdd'>Nom de la categorie</label>
                            <input type='text' id='formNameAdd' className='form-control validate' onChange={onChangeNom} />
                        </div>

                    </div>

                    <div className='modal-footer d-flex justify-content-center editInsideWrapper'>
                        <button type='submit' className='btn btn-outline-secondary btn-block editInside' data-dismiss='modal' onClick={onClickEnregistrer}>Enregistrer
                            <i className='fas fa-paper-plane-o ml-1' />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
)
export default ModalAddCatgorie
