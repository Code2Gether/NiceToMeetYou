import React from 'react';
import { Nav, NavLink, LogoDiv } from './Header.styles';
import { connect } from 'react-redux';
import { HeaderProps } from '../../utils/types/types';
import { removeUser } from '../../redux/users';

const Header: React.FC<HeaderProps> = ({ user, removeUser }) => {
    const handleLogout = () => {
        removeUser();
    };

    const menu =
        user && user.firstName !== '' ? (
            <>
                <NavLink onClick={() => {}}>Create Room</NavLink>
                <NavLink onClick={handleLogout}>Logout</NavLink>
            </>
        ) : (
            <>
                <NavLink href="/signup">Sign Up</NavLink>
                <NavLink href="/login">Login</NavLink>
            </>
        );

    return (
        <Nav>
            <LogoDiv>IMAGEM</LogoDiv>
            {menu}
        </Nav>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
