import React from 'react'
import { Form } from 'react-bootstrap'

export const Select = ({SelectLabel, SelectOption ,feedback,isInvalid,required}) => {
    return (
        <>
        <Form.Label>{SelectLabel}</Form.Label>
            <Form.Select aria-label="Default select example"  required={required}>
                <option selected disabled value="">{SelectOption}</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            {isInvalid && <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>}
        </>
    )
}
