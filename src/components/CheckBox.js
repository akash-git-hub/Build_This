import React from 'react'
import { Form } from 'react-bootstrap'

export const CheckBox = ({type, id, label,onClick,name,value=false}) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type={type}
                id={id}
                name={name}
                checked={value}                
                label={label}
                onClick={onClick}
            />
        </>
    )
}
