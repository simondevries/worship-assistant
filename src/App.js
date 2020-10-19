import React from 'react';
import logo from './logo.svg';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import styled from 'styled-components/macro';
import ControllerPage from './Components/ControllerPage/ControllerPage';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

function App() {
  return (
    <StyledApp className="bp3-dark">
      <ControllerPage />
    </StyledApp>
  );
}

export default App;
