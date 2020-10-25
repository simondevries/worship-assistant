import React, { useState, useEffect } from 'react';
import { Button, Card, H5 } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled, { css } from 'styled-components/macro';
import { DateInput } from '@blueprintjs/datetime';
import {
  getAll as getAllSchedules,
  add as addScheduleRepo,
  set as setSchedule,
} from '../../Storage/scheduleRepository';
import { setCurrentService } from '../../Storage/settingsRepository';
import NewId from '../../Helpers/newId';

const StyledDateInput = styled(DateInput)`
  margin-left: 30px;
`;

const StyledActionButton = styled(Button)``;
const StyledAddButton = styled(Button)`
  margin-top: 33px;
  width: 130px;
`;

const SpacerTr = styled.tr`
  height: 20px;
`;
const StyledInput = styled.input``;

const StyledAddSchedule = styled(Card)`
  margin-bottom: 30px;
`;

const StyledTableScroller = styled.div`
  height: 300px;
  overflow: scroll;
`;

const StyledTable = styled.table`
  width: 100%;

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

  useEffect(() => {
    async function fetchData() {
      const schedules = await getAllSchedules();
      setSchedules(schedules);
    }
    fetchData();
  }, []);

  const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const addSchedule = () => {
    const newSched = {
      id: NewId(),
      resources: [{}],
      date: new Date(),
      title: scheduleTitle,
    };

    setScheduleTitle('');
    setScheduleDateTime(null);
    addScheduleRepo(newSched);

    const updatedSchedules = schedules.concat(newSched);
    setSchedules(updatedSchedules);
    setCurrentService(newSched.id);
  };

  const onClose = () => {
    setSchedules(schedules);
    setOpen(false);
  };

  const openSchedule = (scheduleId) => {
    if (!showOpenConfirm) {
      setShowOpenConfirm(scheduleId);
      return;
    }
    setCurrentService(scheduleId);
    onClose();
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Settings"
        isCloseButtonShown={true}
        onClose={onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <StyledAddSchedule>
            <H5>Current Schedule</H5>
            <StyledInput
              className={Classes.INPUT}
              placeholder="Service Name"
              onChange={(e) =>
                e.target.value &&
                e.target.value.length < 100 &&
                setScheduleTitle(e.target.value)
              }
              value={scheduleTitle}
            />
            <StyledDateInput
              className={Classes.ELEVATION_1}
              formatDate={(date) => date.toLocaleDateString('en-gb')}
              onChange={(e) => setScheduleDateTime(e)}
              placeholder={'Service Date'}
              parseDate={(str) => new Date(str)}
              value={scheduleDateTime}
            />
          </StyledAddSchedule>
          <StyledTableScroller>
            <StyledTable>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              {schedules &&
                schedules.map((s) => (
                  <>
                    <tr>
                      <td>{s.title}</td>
                      <td>{s.date.toLocaleDateString('en-gb')}</td>
                      <td>
                        <StyledActionButton
                          miminal
                          intent={
                            showOpenConfirm === s.id
                              ? 'Success'
                              : 'None'
                          }
                          onBlur={() => setShowOpenConfirm(false)}
                          onClick={() => openSchedule(s.id)}
                          icon="folder-open"
                        >
                          {showOpenConfirm === s.id ? 'Confirm' : ''}
                        </StyledActionButton>
                      </td>
                    </tr>
                    <SpacerTr />
                  </>
                ))}
            </StyledTable>
          </StyledTableScroller>
          <StyledAddButton
            icon="add"
            intent="Success"
            onClick={addSchedule}
          >
            Create new schedule
          </StyledAddButton>
        </div>
      </Dialog>
    </>
  );
};
