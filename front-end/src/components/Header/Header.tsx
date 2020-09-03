import React from 'react';
import { Nav, NavLink, LogoDiv } from './Header.styles';

const Header: React.FC = () => {
    return (
        <Nav>
            <LogoDiv>IMAGEM</LogoDiv>
            <div>
                <NavLink>Sign Up</NavLink>
                <NavLink>Login</NavLink>
                <NavLink>Logout</NavLink>
            </div>
        </Nav>
    );
};

export default Header;
