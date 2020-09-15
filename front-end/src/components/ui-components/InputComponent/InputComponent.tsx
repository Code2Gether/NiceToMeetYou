import React from 'react';
import { InputComponentProps } from '../../../utils/types/types';
import { Input, Label } from './InputComponent.styles';

const InputComponent: React.FC<InputComponentProps> = ({
    name,
    type,
    placeholder,
    onChange,
    required,
    value,
    label = true,
}) => {
    return (
        <>
            <Input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                autoComplete="off"
            />
            {label && <Label>{placeholder}</Label>}
        </>
    );
};

export default InputComponent;
