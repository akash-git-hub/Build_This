import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export const InputField = ({
    className,
    controlId,
    label,
    type,
    placeholder,
    size,
    value,
    onChange,
    as,
    readOnly,
    disabled,
    plaintext,
    isInvalid=false,
    required,
    feedback,
    startIcon,
    endIcon,
    name,
    row,
    id,
    style
}) => {
    return (
        <>
            <Form.Group className={className} controlId={controlId}>
                {label && <Form.Label htmlFor={label}>{label}</Form.Label>}
                <InputGroup>
                    {startIcon && (
                        <InputGroup.Text>
                            {startIcon}
                        </InputGroup.Text>
                    )}
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        size={size}
                        value={value}
                        onChange={onChange}
                        as={as}      
                        row={row}                  
                        readOnly={readOnly}
                        disabled={disabled}
                        plaintext={plaintext}               
                        required={required}
                        className={className}
                        id={label}
                        style={style}
                    />
                    {endIcon && (
                        <InputGroup.Text>
                            {endIcon}
                        </InputGroup.Text>
                    )}
                    <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </>
    );
}
