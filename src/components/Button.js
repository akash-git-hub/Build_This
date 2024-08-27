import React from 'react';
import { Button } from 'react-bootstrap';

export const SharedButton = ({
    type,
    variant,
    label,
    size,
    className,
    href,
    active,
    onClick,
    disabled,
    startIcon,
    endIcon
}) => {
    return (
        <Button
            type={type}
            variant={variant}
            size={size}
            href={href}
            active={active}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {startIcon && <span className="me-2">{startIcon}</span>}
            {label}
            {endIcon && <span className="ms-2">{endIcon}</span>}
        </Button>
    );
}

