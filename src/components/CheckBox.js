import React from 'react'
import { Form } from 'react-bootstrap'

export const CheckBox = ({type, id, name, label, checked, onClick, onChange}) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type={type}
                id={id}
                name={name}             
                label={label}
                onClick={onClick}
                onChange={onChange}
                checked={checked}
            />
        </>
    )
}
