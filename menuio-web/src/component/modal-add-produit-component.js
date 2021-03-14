import React from 'react'
import 'bootstrap/js/dist/modal'

const ModalAddProduit = ({ onClickEnregistrer, onChange, categories, onChangeImage }) => (
    <div>
        <div className='modal fade modalEditClass' id='modalAddProduit' tabIndex='-1' role='dialog' aria-hidden='true'>
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
                            <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Choisissez une image pour le produit</label>
                            <input type='file' name='file' accept='image/*' className='form-control validate' onChange={onChangeImage} />
                        </div>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Nom</label>
                            <input type='text' id='formNameEdit' name='nom' className='form-control validate' onChange={onChange} required />
                        </div>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Description</label>
                            <input type='text' id='formNameEdit' name='description' className='form-control validate' onChange={onChange} />
                        </div>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Prix</label>
                            <input type='number' id='formNameEdit' name='prix' className='form-control validate' onChange={onChange} required />
                        </div>
                        <div className='md-form mb-5'>
                            <label data-error='wrong' data-success='right' htmlFor='formNameEdit'>Categorie</label>
                            <select required name='idCategorie' id='idCategorie' className='form-control validate' onChange={onChange}>
                                <option value='' disabled>Veuillez choisir une categorie</option>
                                {categories.map((categorie, i) =>
                                    <option value={categorie.id} key={i}>{categorie.nom}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='text-center' />
                    <div className='modal-footer d-flex justify-content-center editInsideWrapper'>
                        <button className='btn btn-outline-secondary btn-block editInside' onClick={onClickEnregistrer} data-dismiss='modal'>Enregistrer
                            <i className='fas fa-paper-plane-o ml-1' />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
)

export default ModalAddProduit
