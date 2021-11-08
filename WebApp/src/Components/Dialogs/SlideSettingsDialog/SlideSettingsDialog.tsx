import React, { useState, useContext } from 'react';
import { Dialog, Classes, Tabs, Tab, TabId } from '@blueprintjs/core';
import { settingsRepo } from 'Storage/settingsRepository';
import IState from 'Interfaces/State';
import MainPanel from './Panels/MainPanel';
import ThemePanel from './Panels/ThemePanel';
import { Context } from 'Common/Store/Store';

export default ({ setSettingsModalOpen, activeResourcePointer }) => {
  const [state] = useContext<Array<IState>>(Context);
  if (!state || !state.currentSchedule) return <div>Nostate</div>;

  const [selectedTabId, setSelectedTabId] = useState<TabId>('main');

  return (
    <>
      <Dialog
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
                <ThemePanel
                  activeResourcePointer={activeResourcePointer}
                  onClose={() => {
                    setSettingsModalOpen(false);
                  }}
                />
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
      </Dialog>
    </>
  );
};
