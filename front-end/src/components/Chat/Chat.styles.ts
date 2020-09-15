import styled, { css } from 'styled-components';
import { ChatMessagesLiProps } from '../../utils/types/types';

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: ${({ theme }) => theme.sizes['tiny']};
    width: 100%;
    height: 100vh;
`;

export const ChatMessagesContainer = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    padding: ${({ theme }) => theme.sizes['sm']};
`;

export const ChatMessagesUl = styled.ul`
    list-style: none;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const ChatMessagesLi = styled.li<ChatMessagesLiProps>`
    padding: ${({ theme }) => `${theme.sizes['tiny']} ${theme.sizes['sm']}`};
    background: grey;
    color: white;
    border-radius: 20px;
    width: fit-content;
    position: relative;
    display: block;
    align-self: flex-start;
    margin: 8px 0;
    ${({ direction }) =>
        direction === 'right' &&
        css`
            align-self: flex-end;
            background: black;
        `}
`;

export const ChatControllers = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
