import React from 'react';
import { Button, Icon } from './ButtonIconComponent.style';
import { ButtonIconProps } from '../../../utils/types/types';

const ButtonIconComponent: React.FC<ButtonIconProps> = ({
    fontSize,
    width,
    height,
    disabled,
    color,
    bgColor,
    onClick,
    hoverColor,
    iconType,
}) => {
    return (
        <Button
            width={width}
            height={height}
            disabled={disabled}
            bgColor={bgColor}
            onClick={onClick}
            hoverColor={hoverColor}
        >
            <Icon color={color} icon={iconType} fontSize={fontSize}/>
        </Button>
    );
};

export default ButtonIconComponent;
