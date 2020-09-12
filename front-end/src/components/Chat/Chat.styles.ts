import styled from 'styled-components';

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
`;

export const ChatControllers = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
