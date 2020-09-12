import styled from 'styled-components';
import { ButtonIconProps } from '../../../utils/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button = styled.button<ButtonIconProps>`
    ${(props) => `
        width: ${props.width}rem;
        height: ${props.height}rem;
        disabled: ${props.disabled};
        color: ${props.color};
        background-color: ${props.bgColor};
        border-radius: 50%;
        transition: all 0.1s ease-in-out;

        &:hover {
            transform: scale(1.01) translateY(-0.3rem);
        }
        &:hover > * {
            color: ${props.hoverColor};
        }
        &:active {
            transform: translateY(-0.1rem);
        }
    `};
`;

export const Icon = styled(FontAwesomeIcon)`
    ${(props) => `
        font-size: ${props.fontSize}rem;
        color: ${props.color};
    `}
`;
