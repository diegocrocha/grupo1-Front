import styled from 'styled-components';

export const h1 = styled.h1`
  color: #312F2F;
`;

export const GroupAtividades = styled.div`
  height: 60%;
  margin-bottom: 1%;
  width: 90%;
  margin-left: 5%;
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-image: linear-gradient(-90deg, #C4C4C4 6%, #C4C4C4 8%, transparent 83%);
    border-radius: 7px;        /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #C4C4C4;    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
    border: 3px solid #C4C4C4;  /* creates padding around scroll thumb */
  }
`