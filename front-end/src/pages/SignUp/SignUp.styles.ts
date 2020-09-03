import styled from 'styled-components';

export const SignUpPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const SignUpTitle = styled.h1`
    ${({ theme }) => `
    font-size: ${theme.sizes['xl']};
    font-family: ${theme.fontFamily['title']};
    letter-spacing: ${theme.letterSpacing['sm']};
    margin-bottom: ${theme.sizes['xbig']};
    `}
`;

export const SignUpForm = styled.form`
    width: 50%;
`;

export const SignUpButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: ${({ theme }) => theme.sizes['xbig']};
`;
