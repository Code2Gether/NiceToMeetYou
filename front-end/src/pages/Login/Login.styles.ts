import styled from 'styled-components';

export const LoginPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const LoginTitle = styled.h1`
    ${({ theme }) => `
    font-size: ${theme.sizes['xl']};
    font-family: ${theme.fontFamily['title']};
    letter-spacing: ${theme.letterSpacing['sm']};
    margin-bottom: ${theme.sizes['xbig']};
    `}
`;

export const LoginForm = styled.form`
    width: 50%;
`;
