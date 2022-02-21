import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Common/Store/Store';
import { Button, Card, H5, Icon, H4 } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import NewScheduleCreatedEvent from '../../Events/Domain/newScheduleCreatedEvent';
import {
  emptySchedule,
  hasUserFileHandler,
} from '../../Interfaces/Schedule';
import LoadScheduleEvent from '../../Events/Domain/loadScheduleEvent';
import UserFileHandlerPermissionManagerDialog from './UserFileHandlerPermissionManagerDialog';
import { usePersistentStore } from '../../Hooks/usePersistentStore';

const StyledCard = styled(Card)`
  background: #353535;
`;

const StyledActionButton = styled(Button)`
  margin-left: 30px;
`;

const SpacerTr = styled.tr`
  height: 20px;
`;

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

const StyledTd = styled.td`
  text-align: right;
  padding-right: 10px;
`;

const StyledTipHeader = styled(H5)`
  color: #48aff0;
`;

const ScheduleManagerDialog = ({ setOpen }) => {
  const [showOpenConfirm, setShowOpenConfirm] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [] = useContext(Context);
  const [raiseEvent] = useEventHandler();
  const [showUserFileHandlerModal, setShowUserFileHandlerModal] =
    useState(false);
  const {
    isApproved: isPersistentStoreApproved,
    requestAccess: requestPersistentStoreAccess,
  } = usePersistentStore();

  useEffect(() => {
    async function fetchData() {
      const schedules = await scheduleRepo.getAll();
      // todo (sdv) order by date
      // schedules.orderBy(s => s.)
      setSchedules(schedules);
    }
    fetchData();
  }, []);

  const addSchedule = () => {
    raiseEvent(new NewScheduleCreatedEvent(false, emptySchedule()));

    onClose();
  };

  const onClose = () => {
    setSchedules(schedules);
    setOpen(false);
  };

  const setShowUserFileHandlerModalLocal = (show) => {
    if (!show) {
      setShowUserFileHandlerModal(false);
      onClose();
    } else {
      setShowUserFileHandlerModal(true);
    }
  };

  const openSchedule = async (schedule) => {
    if (!showOpenConfirm) {
      setShowOpenConfirm(schedule.id);
      return;
    }

    raiseEvent(new LoadScheduleEvent(false, schedule));

    if (hasUserFileHandler(schedule)) {
      setShowUserFileHandlerModal(true);
    }

    onClose();
  };

  return (
    <>
      {/* Todo (sdv) hacks - modal inception */}
      {showUserFileHandlerModal ? (
        <UserFileHandlerPermissionManagerDialog
          setOpen={setShowUserFileHandlerModalLocal}
        />
      ) : (
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

            <H4>Previous Sessions</H4>
            {/* </StyledAddSchedule> */}
            <StyledPastSchedules>
              <StyledTableScroller>
                <StyledTable>
                  <tr></tr>
                  {schedules &&
                    schedules
                      .sort((s, t) => (s.date > t.date ? -1 : 1))
                      .map((s) => (
                        <>
                          <tr>
                            <H5 style={{ 'padding-top': '10px' }}>
                              {s.date.toLocaleDateString('en-gb') +
                                ' ' +
                                s.date.toLocaleTimeString('en-gb')}
                            </H5>
                            <StyledTd>
                              <StyledActionButton
                                miminal
                                intent={
                                  showOpenConfirm === s.id
                                    ? 'Success'
                                    : 'None'
                                }
                                onBlur={() =>
                                  setShowOpenConfirm(false)
                                }
                                onClick={() => openSchedule(s)}
                                icon="folder-open"
                              >
                                {showOpenConfirm === s.id
                                  ? 'Confirm'
                                  : ''}
                              </StyledActionButton>
                            </StyledTd>
                          </tr>
                          <SpacerTr />
                        </>
                      ))}
                </StyledTable>
              </StyledTableScroller>
            </StyledPastSchedules>
            <StyledCard>
              <StyledTipHeader>
                <Icon icon="lightbulb" />
                {'  '}Did you know
              </StyledTipHeader>
              You can press ` on the keyboard to bring up the search
              bar
            </StyledCard>
            <br />
            {!isPersistentStoreApproved && (
              <StyledCard>
                <StyledTipHeader>
                  <Icon icon="lightbulb" />
                  {'  '}Permissions
                </StyledTipHeader>
                To ensure your songs do not get cleared off the web
                app, please approve permission for your browser to
                prevent the state from getting cleared.
                <Button
                  onClick={() => requestPersistentStoreAccess()}
                >
                  Enable
                </Button>
              </StyledCard>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ScheduleManagerDialog;
