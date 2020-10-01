import React, { useState, ChangeEvent } from 'react';
import { ModalProps } from '../../../utils/types/types';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { ModalContainer, ModalDiv, ModalText } from './ModalComponent.styles';
import { theme } from '../../../css/theme';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';

const ModalComponent: React.FC<ModalProps> = ({
    text,
    secondText,
    btnText,
    handleCancel,
    handleOk,
    okBtnDisabled,
    errorMessage,
    children,
}) => {
    return (
        <ModalContainer>
            <ModalDiv>
                <ModalText>{text}</ModalText>
                <ModalText>{secondText}</ModalText>
                {children}
                {errorMessage && (
                    <ErrorMessage
                        msg={errorMessage}
                        color={theme.colors['red']}
                    />
                )}
                <ButtonWrapper direction="right">
                    {handleCancel && (
                        <ButtonComponent
                            fontSize={2}
                            width={10}
                            height={4}
                            disabled={false}
                            color={theme.colors.white}
                            bgColor={theme.colors['red']}
                            onClick={handleCancel}
                        >
                            Cancel
                        </ButtonComponent>
                    )}
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={okBtnDisabled() || false}
                        color={theme.colors.white}
                        bgColor={
                            okBtnDisabled()
                                ? theme.colors.grey['200']
                                : theme.colors.green['400']
                        }
                        onClick={handleOk}
                    >
                        {btnText}
                    </ButtonComponent>
                </ButtonWrapper>
            </ModalDiv>
        </ModalContainer>
    );
};

export default ModalComponent;
