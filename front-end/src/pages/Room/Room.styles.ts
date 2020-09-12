import styled from 'styled-components';

export const RoomContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const RoomVideo = styled.div`
    min-height: 20rem;
    min-width: 30rem;
    object-fit: cover;
    padding: ${({ theme }) => theme.sizes['tiny']};
`;

export const RoomFooter = styled.div`
    width: 100%;
    height: 6rem;
`;
