import React from 'react'
import { Form } from 'react-bootstrap'

export const Select = ({SelectLabel, SelectOption,option=[]}) => {
    return (
        <>
        <Form.Label>{SelectLabel}</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>{SelectOption}</option>
                {option.length > 0 &&
                    option.map((e, i) => (
                        <option key={i} value={e.value}>{e.name} </option>
                    ))}
            </Form.Select>
        </>
    )
}
