import { useEffect, useContext, useState } from 'react';
import {
  Button,
  Classes,
  ButtonGroup,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { settingsRepo } from '../../../../Storage/settingsRepository';
import { defaultTheme, ITheme } from '../../../../Interfaces/themes';
import { Context } from '../../../../Common/Store/Store';
import { ISettings } from 'Interfaces/Settings';
import { State } from '@storybook/api';
import ImageSelectionDialog from 'Components/Dialogs/ImageSelectionDialog/ImageSelectionDialog';
import UpdateSettingsEvent from 'Events/Domain/updateSettingsEvent';
import useEventHandler from 'Events/Handlers/useEventHandler';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';

const StyledPreviewContainer = styled.div`
  height: 100%;
  padding: 10px 15px;
  width: 100%;
  display: flex;
  align-items: center;
  background: black;
  border-radius: 4px;
`;

const StyledTable = styled.table`
  tr {
    height: 55px;
  }
`;

const StyledFooter = styled.div`
  margin-top: 5px;
`;
const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 300px;
  margin-left: 10px;

  .bp3-form-group {
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background: #3a4650;
  padding-left: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const ThemePanel = ({ activeResourcePointer, onClose }) => {
  const [raiseEvent] = useEventHandler();
  console.log(activeResourcePointer)
  const state: State =
    useContext(Context);
  const [isWallpaperSelectionOpen, setIsWallpaperSelectionOpen] =
    useState(false);
  const [editingState, setEditingState] =
    useState<ITheme>(defaultTheme);

  useEffect(() => {
    async function fetchData() {
      const res: ISettings = await settingsRepo.get('settings');

      setEditingState({
        ...defaultTheme,
        ...res.globalSlideTheme,
      });
    }
    fetchData();
  }, []);

  const onSubmit = async () => {
    const settings = await settingsRepo.get();
    const newSettings: ISettings = {
      ...settings,
      globalSlideTheme: editingState,
    };

    raiseEvent(new UpdateSettingsEvent(false, newSettings));

    setTimeout(() => {
      onClose();
    }, 0);
  };

  if (!state || !state.currentSchedule) return <div>NoState</div>;

  return (
    <>
      <StyledBody>
        <StyledInputsContainer>
          <StyledTable>
            <tr>
              <td>Font</td>
              <td>
                <ButtonGroup>
                  <Button
                    data-testid="bold"
                    onClick={() => {
                      setEditingState({
                        ...editingState,
                        textIsBold: !editingState.textIsBold,
                      });
                    }}
                    active={editingState.textIsBold}
                  >
                    B
                  </Button>
                  <Button
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textIsItalic: !editingState.textIsItalic,
                      })
                    }
                    active={editingState.textIsItalic}
                  >
                    I
                  </Button>

                  <Button
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textIsUnderlined:
                          !editingState.textIsUnderlined,
                      })
                    }
                    active={editingState.textIsUnderlined}
                  >
                    U
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Justify</td>
              <td>
                {' '}
                <ButtonGroup>
                  <Button
                    icon="align-left"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textHorizontalAlign: 'L',
                      })
                    }
                    active={editingState.textHorizontalAlign === 'L'}
                  ></Button>

                  <Button
                    icon="align-center"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textHorizontalAlign: 'M',
                      })
                    }
                    active={editingState.textHorizontalAlign === 'M'}
                  ></Button>

                  <Button
                    icon="align-right"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textHorizontalAlign: 'R',
                      })
                    }
                    active={editingState.textHorizontalAlign === 'R'}
                  ></Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Alignment</td>
              <td>
                <ButtonGroup>
                  <Button
                    icon="alignment-top"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textVerticalAlign: 'T',
                      })
                    }
                    active={editingState.textVerticalAlign === 'T'}
                  ></Button>

                  <Button
                    icon="alignment-horizontal-center"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textVerticalAlign: 'M',
                      })
                    }
                    active={editingState.textVerticalAlign === 'M'}
                  ></Button>

                  <Button
                    icon="alignment-bottom"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textVerticalAlign: 'B',
                      })
                    }
                    active={editingState.textVerticalAlign === 'B'}
                  ></Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Text Border</td>
              <td>
                {' '}
                <Button
                  onClick={() => {
                    setEditingState({
                      ...editingState,
                      showTextBorder: !editingState.showTextBorder,
                    });
                  }}
                  active={editingState.showTextBorder}
                >
                  {editingState.showTextBorder
                    ? 'Enabled'
                    : 'Disabled'}
                </Button>
              </td>
            </tr>
            <tr>
              <td>Font Size</td>
              <td>
                <ButtonGroup>
                  <Button
                    icon="plus"
                    onClick={() => {
                      setEditingState({
                        ...editingState,
                        fontSize: editingState.fontSize + 0.1,
                      });
                    }}
                  ></Button>

                  <Button
                    icon="minus"
                    onClick={() => {
                      setEditingState({
                        ...editingState,
                        fontSize: editingState.fontSize - 0.1,
                      });
                    }}
                  ></Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>Background</td>
              <td
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  // alignItems: 'center',
                  gap: '5',
                }}
              >
                <b>Color</b>
                <input
                  type="color"
                  value={editingState.backgroundColor}
                  onChange={(e) =>
                    setEditingState({
                      ...editingState,
                      backgroundColor: e.target.value,
                    })
                  }
                />

                <ButtonGroup>
                  <Button
                    icon="search"
                    onClick={() => {
                      setIsWallpaperSelectionOpen(true);
                    }}
                  >
                    Image
                  </Button>
                </ButtonGroup>
              </td>
            </tr>

            <tr>
              <td>Text Colour</td>
              <td>
                <input
                  type="color"
                  value={editingState.textColor}
                  onChange={(e) => {
                    setEditingState({
                      ...editingState,
                      textColor: e.target.value,
                    });
                  }}
                />
              </td>
            </tr>
          </StyledTable>

          {/* <FormGroup label="Text"></FormGroup>
          
          </FormGroup> */}
        </StyledInputsContainer>
        <StyledPreviewContainer>
          <MinatureProjectorView
            useDemoText={true}
            overrideTheme={editingState}
          />
        </StyledPreviewContainer>
        {/* errors will return when field validation fails  */}
      </StyledBody>
      <StyledFooter className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={onClose}>Close</Button>
        <Button
          icon="floppy-disk"
          type="submit"
          intent="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </StyledFooter>
      {isWallpaperSelectionOpen && (
        <ImageSelectionDialog
          onImageSelected={(uri) => {
            setEditingState({
              ...editingState,
              backgroundImageUri: uri,
            });
          }}
          onClose={() => {
            setIsWallpaperSelectionOpen(false);
          }}
        ></ImageSelectionDialog>
      )}
    </>
  );
};

export default ThemePanel;
