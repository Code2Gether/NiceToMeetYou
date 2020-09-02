import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.grey['200']};
    padding: ${({ theme }) => theme.sizes['md']};
`;

export const LogoDiv = styled.div`
    width: ${({ theme }) => theme.sizes['xbig']};
`;

export const NavLink = styled.a`
    cursor: pointer;
    ${({ theme }) => `
        font-size: ${theme.sizes['md']};
        font-weight: ${theme.fontWeight['bold']}
        color: ${theme.colors.green['400']};
        margin: ${theme.sizes['sm']};
        &:hover {
            color: ${theme.colors.green['200']};
        }
    `}
`;
