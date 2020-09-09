import React, { useState, ChangeEvent } from 'react';
import { ModalProps } from '../../../utils/types/types';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { ModalContainer, ModalDiv, ModalText } from './ModalComponent.styles';
import { theme } from '../../../css/theme';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';

const ModalComponent: React.FC<ModalProps> = ({
    text,
    btnText,
    handleCancel,
    handleOk,
    input,
}) => {
    const [email, setEmail] = useState('');

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setEmail(value);
    };

    return (
        <ModalContainer>
            <ModalDiv>
                <ModalText>{text}</ModalText>
                {input && (
                    <InputComponent
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Email"
                        required={true}
                    />
                )}
                <ButtonWrapper direction="right">
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
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={false}
                        color={theme.colors.white}
                        bgColor={theme.colors.green['400']}
                        onClick={() => handleOk(email)}
                    >
                        {btnText}
                    </ButtonComponent>
                </ButtonWrapper>
            </ModalDiv>
        </ModalContainer>
    );
};

export default ModalComponent;
