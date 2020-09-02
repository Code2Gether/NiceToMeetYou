import styled from 'styled-components';
import { ButtonProps } from '../../utils/types/types';

export const Button = styled.button<ButtonProps>`
    ${(props) => `
        font-size: ${props.fontSize}rem;
        width: ${props.width}rem;
        height: ${props.height}rem;
        disabled: ${props.disabled};
        color: ${props.color};
        background-color: ${props.bgColor};
        border-radius: ${props.theme.borderRadius['medium']}
    `}
`;
