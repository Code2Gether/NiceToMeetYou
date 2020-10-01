import React from 'react';
import { ErrorMessageProps } from '../../../utils/types/types';
import {
    ErrorMessageDiv,
    ErrorMessageTitle,
    ErrorMessageIcon,
} from './ErrorMessage.styles';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    msg,
    iconType,
    color,
}) => {
    return (
        <ErrorMessageDiv>
            <ErrorMessageTitle color={color}>{msg}</ErrorMessageTitle>
            {iconType && <ErrorMessageIcon color={color} icon={iconType} />}
        </ErrorMessageDiv>
    );
};

export default ErrorMessage;
