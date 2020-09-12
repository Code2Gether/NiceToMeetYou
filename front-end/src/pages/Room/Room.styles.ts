import styled from 'styled-components';

export const RoomContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(15rem, 30vw);
    grid-template-rows: 6rem 1fr 6rem;
    width: 100vw;
    height: 100vh;
`;

export const RoomVideoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background: rgba(0,0,0,0.4);
`;

export const RoomHeader = styled.div`
    width: 100%;
    height: 6rem;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    background: blue;
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
    grid-row: 3 / 4;
    grid-column: 1 / 2;
    background: blue;
`;
