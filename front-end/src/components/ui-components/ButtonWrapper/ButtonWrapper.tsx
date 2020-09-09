import React from 'react';
import { ButtonWrapperContainer } from './ButtonWrapper.styles';
import { ButtonWrapperProps } from '../../../utils/types/types';

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
    children,
    direction,
}) => {
    return (
        <ButtonWrapperContainer direction={direction}>
            {children}
        </ButtonWrapperContainer>
    );
};

export default ButtonWrapper;
