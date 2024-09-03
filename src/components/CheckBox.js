import React from 'react'
import { Form } from 'react-bootstrap'

export const CheckBox = ({type, id, label,onClick,name}) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type={type}
                id={id}
                name={name}
                label={label}
                onClick={onClick}
            />
        </>
    )
}
