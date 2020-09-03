import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    flex-grow: 1;
    ${({ theme }) => `
        height: ${theme.sizes['sm']};
        padding-left: ${theme.sizes['sm']};
        margin-top: ${theme.sizes['xtiny']};
        font-size: ${theme.sizes['xsm']};
    `}
    align-items: center;
    transition: all 0.2s ease-out;
`;

export const Input = styled.input`
    display: flex;
    width: 100%;
    ${({ theme }) => `
        height: ${theme.sizes['lg']};
        padding-left: ${theme.sizes['sm']};
        margin-top: ${theme.sizes['xtiny']};
        font-size: ${theme.sizes['sm']};
        border-radius: ${theme.borderRadius['default']};
    `}

    &:placeholder-shown + ${Label} {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-4rem);
    }
`;
