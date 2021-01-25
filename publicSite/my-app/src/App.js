import logo from "./logo.svg";
import "./App.scss";
import AOS from "aos";
import React, { useEffect } from "react";
import { Button } from "@blueprintjs/core";
import ScrollableContainer from "react-full-page-scroll";

function PageComponent({ children }) {
  return <div>{children}</div>;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="bp3-dark">
      <header>
        <div className="logoContainer">
          <img className="logo" src={logo} />
        </div>
        <Button small intent="primary">
          Launch App
        </Button>
      </header>
      <ScrollableContainer animationTime={2000}>
        {/* <PageComponent>
          <div className="page-one-container">one</div>
        </PageComponent> */}
        <PageComponent>Page Tw</PageComponent>
        <PageComponent>Page Th</PageComponent>
      </ScrollableContainer>
    </div>
  );
}

export default App;

{
  /* <div className="App">
      <header className="App-header">
        <div className="logoContainer">
          <img src={logo} />
        </div>
        <Button intent="primary">Launch App</Button>
      </header>
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" data-aos="fade-up" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */
}
