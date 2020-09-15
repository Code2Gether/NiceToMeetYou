import styled, { css } from 'styled-components';
import { ButtonWrapperProps } from '../../../utils/types/types';

const rightAlign = css`
    justify-content: flex-end;

    &:last-child > button:last-of-type {
        margin-left: ${({ theme }) => theme.sizes['sm']};
    }
`;

const leftAlign = css`
    justify-content: flex-start;

    &:last-child > button:first-of-type {
        margin-left: ${({ theme }) => theme.sizes['sm']};
    }
`;

const centerAlign = css`
    justify-content: center;

    &:last-child > button:last-of-type {
        margin-left: ${({ theme }) => theme.sizes['sm']};
    }
`;

export const ButtonWrapperContainer = styled.div<ButtonWrapperProps>`
    display: flex;
    width: 100%;
    margin-top: ${({ theme }) => theme.sizes['sm']};
    position: relative;
    ${(props) =>
        props.direction === 'right'
            ? rightAlign
            : props.direction === 'left'
            ? leftAlign
            : centerAlign}
`;
