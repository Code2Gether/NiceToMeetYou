import styled from 'styled-components';
import { ButtonProps } from '../../../utils/types/types';

export const Button = styled.button<ButtonProps>`
    ${(props) => `
        font-size: ${props.fontSize}rem;
        width: ${props.width}rem;
        height: ${props.height}rem;
        disabled: ${props.disabled};
        color: ${props.color};
        background-color: ${props.bgColor};
        border-radius: ${props.theme.borderRadius['medium']};
        transition: all 0.1s ease-in-out;

        &:hover {
            transform: scale(1.01) translateY(-0.3rem);
            box-shadow: ${props.theme.shadows['button']};
        }
        &:active {
            transform: translateY(-0.1rem);
            box-shadow: ${props.theme.shadows['buttonClick']};
        }
    `};
`;
