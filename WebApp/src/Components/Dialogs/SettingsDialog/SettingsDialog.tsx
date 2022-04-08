import React, { useState, useContext } from 'react';
import { Dialog, Classes, Tabs, Tab, TabId } from '@blueprintjs/core';
import IState from 'Interfaces/State';
import MainPanel from './Panels/MainPanel';
import ThemePanel from './Panels/ThemePanel';
import { Context } from 'Common/Store/Store';
import styled from '@emotion/styled';
import ActiveResourcePointer from 'Interfaces/ActiveResourcePointer';

const StyledThemeTab = styled(Tab)`
  flex-grow: 1;
`;

const StyledDialog = styled(Dialog)`
  min-width: 700px;
  width: fit-content;
  max-width: 80vw;

  height: 80vh;
  max-height: 670px;
  min-height: 300px;

  .bp3-tab-panel {
    flex-grow: 1;
  }

  .bp3-tab-panel {
    height: 100%;
  }

  .bp3-tabs {
    height: 100%;
  }
  .bp3-tab-list {
    flex: 10 1 150px;
  }

  .themeTab {
    flex: 50 1 600px;
  }

  .mainTab {
    flex: 50 1 600px;
  }
`;
export enum SettingsDialogTab {
  Main,
  Theme,
}

const SettingsDialog = ({
  setSettingsModalOpen,
  activeResourcePointer,
  openTab,
}: {
  setSettingsModalOpen: (isOpen: boolean) => void;
  activeResourcePointer: ActiveResourcePointer;
  openTab?: SettingsDialogTab;
}) => {
  const [state] = useContext<Array<IState>>(Context);

  const firstTab =
    openTab === SettingsDialogTab.Theme ? 'theme' : 'main';

  const [selectedTabId, setSelectedTabId] = useState<TabId>(firstTab);
  if (!state || !state.currentSchedule) return <div>Nostate</div>;

  return (
    <>
      <StyledDialog
        className={Classes.DARK}
        isOpen
        title="Settings"
        isCloseButtonShown={true}
        onClose={() => setSettingsModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <Tabs
            id="TabsExample"
            onChange={(tab) => {
              setSelectedTabId(tab);
            }}
            vertical={true}
            selectedTabId={selectedTabId}
          >
            <Tab
              id="main"
              data-testid="main-section"
              panelClassName={'mainTab'}
              title="Main"
              panel={<MainPanel />}
            />
            <Tab
              id="theme"
              title="Theme"
              data-testid="themeSection"
              panelClassName={'themeTab'}
              panel={
                selectedTabId !== 'theme' ? (
                  <div />
                ) : (
                  <ThemePanel
                    activeResourcePointer={activeResourcePointer}
                    onClose={() => {
                      setSettingsModalOpen(false);
                    }}
                  />
                )
              }
            />
            {/* <Tab id="rx" title="React" panel={<ReactPanel />} />
               <Tab
                 id="bb"
                 disabled
                 title="Backbone"
                 panel={<BackbonePanel />}
               />
               <Tabs.Expander />
               <input
                 className="bp3-input"
                 type="text"
                 placeholder="Search..."
               /> */}
          </Tabs>
        </div>
      </StyledDialog>
    </>
  );
};

export default SettingsDialog;
