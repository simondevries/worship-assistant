import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import { Button, Card, H5, H3 } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled, { css } from 'styled-components/macro';
import { DateInput } from '@blueprintjs/datetime';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import { settingsRepo } from '../../Storage/settingsRepository';
import NewId from '../../Helpers/newId';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import NewScheduleCreatedEvent from '../../Events/Domain/newScheduleCreatedEvent';
import { empty as emptyResource } from '../../Interfaces/Schedule';

const StyledDateInput = styled(DateInput)`
  margin-left: 30px;
`;

const StyledActionButton = styled(Button)`
  margin-left: 30px;
`;

const StyledAddButton = styled(Button)`
  margin-top: 33px;
  width: 130px;
`;

const SpacerTr = styled.tr`
  height: 20px;
`;
const StyledInput = styled.input``;

const StyledNewButton = styled(Button)`
  padding: 14px 20px;
  margin-bottom: 30px;
  margin-top: 7px;
`;

const StyledPastSchedules = styled(Card)`
  margin-bottom: 30px;
  margin-top: 20px;
`;

const StyledTableScroller = styled.div`
  height: 300px;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  padding-left: 30px;
  padding-right: 10px;

  th {
    width: 100px;
    text-align: left;
    height: 25px;
    vertical-align: top;
  }
`;

export default ({ setOpen }) => {
  const [scheduleTitle, setScheduleTitle] = useState();
  const [showOpenConfirm, setShowOpenConfirm] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState();
  const [schedules, setSchedules] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [raiseEvent] = useEventHandler();

  useEffect(() => {
    async function fetchData() {
      const schedules = await scheduleRepo.getAll();
      // todo (sdv) order by date
      // schedules.orderBy(s => s.)
      setSchedules(schedules);
    }
    fetchData();
  }, []);

  const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const addSchedule = () => {
    raiseEvent(
      new NewScheduleCreatedEvent(
        false,
        emptyResource(scheduleTitle),
      ),
    );

    onClose();
  };

  const onClose = () => {
    setSchedules(schedules);
    setOpen(false);
  };

  const openSchedule = (schedule) => {
    if (!showOpenConfirm) {
      setShowOpenConfirm(schedule.id);
      return;
    }
    dispatch({
      type: 'setCurrentSchedule',
      payload: schedule,
    });
    settingsRepo.setCurrentService(schedule.id);
    onClose();
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Welcome"
        isCloseButtonShown={true}
        onClose={onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <StyledNewButton
            icon="add"
            large
            onClick={addSchedule}
            intent="success"
          >
            Start New Session
          </StyledNewButton>
          <H3>Previous Sessions</H3>
          {/* </StyledAddSchedule> */}
          <StyledPastSchedules>
            <StyledTableScroller>
              <StyledTable>
                <tr></tr>
                {schedules &&
                  schedules.map((s) => (
                    <>
                      <tr>
                        <H5 style={{ 'padding-top': '10px' }}>
                          {s.date.toLocaleDateString('en-gb')}
                        </H5>
                        <td>
                          <StyledActionButton
                            miminal
                            intent={
                              showOpenConfirm === s.id
                                ? 'Success'
                                : 'None'
                            }
                            onBlur={() => setShowOpenConfirm(false)}
                            onClick={() => openSchedule(s)}
                            icon="folder-open"
                          >
                            {showOpenConfirm === s.id
                              ? 'Confirm'
                              : ''}
                          </StyledActionButton>
                        </td>
                      </tr>
                      <SpacerTr />
                    </>
                  ))}
              </StyledTable>
            </StyledTableScroller>
          </StyledPastSchedules>
        </div>
      </Dialog>
    </>
  );
};
