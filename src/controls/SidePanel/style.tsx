import styled from 'styled-components'

export const FloatPanel = styled.div`
    position: absolute;
    top: 40px;
    height: calc(100vh - 40px);
    left:0;
    background-color: black;
    display: flex;
    flex-direction:column;
    padding: 10px;
    gap:10px;
    z-index:3;
`;

export const PanelItem = styled.div`
    background-color: red;
    cursor:pointer
`;