import React from 'react'
import { Form } from 'react-bootstrap'

export const Select = ({SelectLabel, SelectOption,option=[],isInvalid=false,feedback=""}) => {
    return (
        <>
        <Form.Group controlId={SelectLabel}>
        <Form.Label>{SelectLabel}</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>{SelectOption}</option>
                {option.length > 0 &&
                    option.map((e, i) => (
                        <option key={i} value={e.value}>{e.name} </option>
                    ))}
            </Form.Select>
            {isInvalid && <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>}
            </Form.Group>
        </>
    )
}
