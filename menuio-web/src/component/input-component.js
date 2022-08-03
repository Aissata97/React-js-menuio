import React from 'react'

const InputComponent = ({ text, id, name, value, type, onChange, classNameDiv, required, classNameInput }) => (
    <div className={classNameDiv}>
        <label htmlFor={id}>{text}</label>
        <input type={type} id={id} name={name} value={value} onChange={onChange} className={classNameInput} required={required} />
    </div>
)

export default InputComponent
