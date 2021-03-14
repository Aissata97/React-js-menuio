import React from 'react'

const ModalSetLogo = ({ onChangeImg, onClickSaveLogo }) => (
    <div>
        <div className='modal fade modalEditClass' id='modalSetLogo' tabIndex='-1' role='dialog' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header text-center'>
                        <h4 className='modal-title w-100 font-weight-bold text-secondary ml-5'>Modification du logo</h4>
                        <button type='button' className='close text-secondary' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body mx-3'>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameAdd'>Choisissez une image</label>
                            <input type='file' accept='image/*' id='formNameAdd' className='form-control validate' onChange={onChangeImg} />
                        </div>
                    </div>

                    <div className='modal-footer d-flex justify-content-center editInsideWrapper'>
                        <button type='submit' className='btn btn-outline-secondary btn-block editInside' data-dismiss='modal' onClick={onClickSaveLogo}>
                            Utiliser l'image choisi comme logo
                            <i className='fas fa-paper-plane-o ml-1' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ModalSetLogo
