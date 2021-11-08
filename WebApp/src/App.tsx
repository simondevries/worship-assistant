import React, { useEffect } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css/normalize.css';

import ReactGA from 'react-ga';
import styled from 'styled-components/macro';
import AppRouter from './AppRouter';
import { useBrowserSupported } from './Hooks/useBrowserSupported';
import { Store } from './Common/Store/Store';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-186478125-1', {
      titleCase: false,
      debug: false,
      testMode: true,
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
    ReactGA.pageview(
      window.location.pathname + window.location.search,
    );
  }, []);
  const [isSupported] = useBrowserSupported();
  if (isSupported === null) return <div>Loading...</div>;
  // if (isSupported === false)
  //   return (
  //     <h2>
  //       Unfortunately your browser is not yet supported. Please use an
  //       up to date version of Google Chrome.
  //     </h2>
  //   );

  return (
    <StyledApp className="bp3-dark">
      <Store>
        <AppRouter />
      </Store>
    </StyledApp>
  );
}

export default App;
