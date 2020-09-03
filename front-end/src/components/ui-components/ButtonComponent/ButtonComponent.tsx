import React from 'react';
import { Button } from './ButtonComponent.style';
import { ButtonProps } from '../../../utils/types/types';

const ButtonComponent: React.FC<ButtonProps> = ({
    fontSize,
    width,
    height,
    disabled,
    color,
    bgColor,
    onClick,
    children,
}) => {
    return (
        <Button
            color={color}
            fontSize={fontSize}
            width={width}
            height={height}
            disabled={disabled}
            bgColor={bgColor}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default ButtonComponent;
