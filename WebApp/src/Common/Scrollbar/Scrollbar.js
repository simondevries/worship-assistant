import { css } from 'styled-components';

const Scrollbar = css`
  /* total width */
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track:hover {
    /* background-color: #f4f4f4; */
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    /* border: 4px solid #f4f4f4; */
  }

  /* set button(top and bottom of the scrollbar) */
  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }
`;

export default Scrollbar;
