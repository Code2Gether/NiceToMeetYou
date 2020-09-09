import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ theme }) => `
        padding: ${theme.sizes['sm']};
    `};
`;

export const ModalDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 15rem;
    max-width: 50rem;
    min-width: 25rem;
    ${({ theme }) => `
        border-radius: ${theme.borderRadius['default']};
        background-color: ${theme.colors['white']};
        padding: ${theme.sizes['sm']};
        box-shadow: ${theme.shadows['main']}
    `}
`;

export const ModalText = styled.p`
    ${({ theme }) => `
        font-size: ${theme.sizes['sm']};
        margin-bottom: ${theme.sizes['sm']};        
    `}
`;
