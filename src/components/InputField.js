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
    isInvalid,
    required,
    feedback,
    startIcon,
    endIcon,
    id,
    autoComplete,
    
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
                        size={size}
                        value={value}
                        onChange={onChange}
                        as={as}
                        readOnly={readOnly}
                        disabled={disabled}
                        plaintext={plaintext}
                        isInvalid={isInvalid}
                        required={required}
                        className={className}
                        id={id}
                        autoComplete={autoComplete}
                    />
                    {endIcon && (
                        <InputGroup.Text>
                            {endIcon}
                        </InputGroup.Text>
                    )}
                    {isInvalid && <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>}
                </InputGroup>
            </Form.Group>
        </>
    );
}
