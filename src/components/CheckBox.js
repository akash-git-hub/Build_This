import React from 'react'
import { Form } from 'react-bootstrap'

export const CheckBox = ({type, id, label}) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type={type}
                id={id}
                label={label}
            />
        </>
    )
}
