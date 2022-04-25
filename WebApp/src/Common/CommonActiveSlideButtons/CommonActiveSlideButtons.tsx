import { Button } from '@blueprintjs/core';
import { Context } from 'Common/Store/Store';
import ChangeProjectorModeEvent from 'Events/Domain/changeProjectorModeEvent';
import useEventHandler from 'Events/Handlers/useEventHandler';
import { ProjectorViewMode, Schedule } from 'Interfaces/Schedule';
import IState from 'Interfaces/State';
import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function CommonActiveSlideButtons(props: {
  children?: any;
}) {
  const { children } = props;
  const [raiseEvent] = useEventHandler();
  const [state]: [state: IState] = useContext(Context);
  const isWhiteout = Schedule.selectors.isProjectorWhiteout(
    state.currentSchedule,
  );
  const isBlackout = Schedule.selectors.isProjectorBlackout(
    state.currentSchedule,
  );
  const isBlank = Schedule.selectors.isProjectorBlank(
    state.currentSchedule,
  );

  const changeProjectorModeToStandard = () => {
    raiseEvent(
      new ChangeProjectorModeEvent(
        false,
        ProjectorViewMode.Standard,
        undefined,
      ),
    );
  };

  return (
    <StyledButtonContainer>
      <Button
        active={isWhiteout}
        onClick={() => {
          if (isWhiteout) {
            changeProjectorModeToStandard();
            return;
          }

          raiseEvent(
            new ChangeProjectorModeEvent(
              false,
              ProjectorViewMode.Blackout,
              'White',
            ),
          );
        }}
      >
        White
      </Button>
      <Button
        active={isBlackout}
        onClick={() => {
          if (isBlackout) {
            changeProjectorModeToStandard();
            return;
          }

          raiseEvent(
            new ChangeProjectorModeEvent(
              false,
              ProjectorViewMode.Blackout,
              'Black',
            ),
          );
        }}
      >
        Black
      </Button>
      <Button
        active={isBlank}
        onClick={() => {
          if (isBlank) {
            changeProjectorModeToStandard();
            return;
          }
          raiseEvent(
            new ChangeProjectorModeEvent(
              false,
              ProjectorViewMode.Blank,
              'Blank',
            ),
          );
        }}
      >
        Blank
      </Button>
      {children}
    </StyledButtonContainer>
  );
}
