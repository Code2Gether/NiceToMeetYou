import styled from 'styled-components';
import { ErrorMessageProps } from '../../../utils/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ErrorMessageDiv = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.sizes['sm']};
`;

export const ErrorMessageTitle = styled.h1<ErrorMessageProps>`
    ${(props) => `
        color: ${props.color};
        font-size: ${props.theme.sizes['big']};
    `}
`;

export const ErrorMessageIcon = styled(FontAwesomeIcon)`
    ${(props) => `
        color: ${props.color};
        font-size: ${props.theme.sizes['big']};
        margin-left: ${props.theme.sizes['sm']};
    `}
`;
