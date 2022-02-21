import React, { useState, useContext } from 'react';
import { Dialog, Classes, Tabs, Tab, TabId } from '@blueprintjs/core';
import { settingsRepo } from 'Storage/settingsRepository';
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

  .bp3-tab-panel {
    flex-grow: 1;
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
              title="Main"
              panel={<MainPanel />}
            />
            <Tab
              id="theme"
              title="Theme"
              data-testid="theme-section"
              role=""
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
              panelClassName="ember-panel"
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
