import { useEffect, useContext, useState } from 'react';
import {
  Button,
  Classes,
  ButtonGroup,
  FormGroup,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { settingsRepo } from '../../../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';
import ProjectorView from '../../../ProjectorView/ProjectorView';
import {
  defaultSongTheme,
  ITheme,
} from '../../../../Interfaces/themes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Context } from '../../../../Common/Store/Store';
import { ISettings } from 'Interfaces/Settings';
import { State } from '@storybook/api';
import { ReducerAction } from 'Reducers/reducers';
import ImageSelectionDialog from 'Components/Dialogs/ImageSelectionDialog/ImageSelectionDialog';

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledPreviewContainer = styled.div`
  display: flex;
  max-width: 500px;
  width: 100%;
  min-width: 300px;
`;

const StyledProjectorView = styled(ProjectorView)`
  width: 100%;
`;

const ThemePanel = ({ activeResourcePointer, onClose }) => {
  const [state, dispatch]: [State, (action: ReducerAction) => void] =
    useContext(Context);
  const [isWallpaperSelectionOpen, setIsWallpaperSelectionOpen] =
    useState(false);
  const [editingState, setEditingState] =
    useState<ITheme>(defaultSongTheme);

  useEffect(() => {
    async function fetchData() {
      const res: ISettings = await settingsRepo.get('settings');

      setEditingState({
        ...defaultSongTheme,
        ...res.globalSlideTheme,
      });
    }
    fetchData();
  }, []);

  const onSubmit = async () => {
    const settings = await settingsRepo.get();
    const newSetting: ISettings = {
      ...settings,
      globalSlideTheme: editingState,
    };

    console.log({ newSetting });

    settingsRepo.set(newSetting, 'settings');
    dispatch({ type: 'setSettings', payload: settings });
    setTimeout(() => {
      onClose();
    }, 0);
  };

  if (!state || !state.currentSchedule) return <div>NoState</div>;

  return (
    <>
      <div>
        <div className={Classes.DIALOG_BODY}>
          <br />
          <StyledBody>
            <StyledInputsContainer>
              <FormGroup label="Font">
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
              </FormGroup>

              <FormGroup label="Horizontal Align">
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
              </FormGroup>
              <FormGroup label="Vertical Align">
                <ButtonGroup>
                  <Button
                    icon="caret-up"
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
                    icon="caret-down"
                    onClick={() =>
                      setEditingState({
                        ...editingState,
                        textVerticalAlign: 'B',
                      })
                    }
                    active={editingState.textVerticalAlign === 'B'}
                  ></Button>
                </ButtonGroup>
              </FormGroup>
              <FormGroup label="Background Color">
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
              </FormGroup>

              <FormGroup>
                Wallpaper
                <ButtonGroup>
                  <Button
                    icon="search"
                    onClick={() => {
                      setIsWallpaperSelectionOpen(true);
                    }}
                  >
                    Search
                  </Button>
                </ButtonGroup>
              </FormGroup>

              <FormGroup label="Text">
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
                <Button
                  onClick={() => {
                    setEditingState({
                      ...editingState,
                      showTextBorder: !editingState.showTextBorder,
                    });
                  }}
                  active={editingState.showTextBorder}
                >
                  Text border
                </Button>
              </FormGroup>
              <FormGroup label="Font Size">
                <ButtonGroup>
                  <Button
                    icon="chevron-up"
                    onClick={() => {
                      setEditingState({
                        ...editingState,
                        fontSize: editingState.fontSize + 0.1,
                      });
                    }}
                  ></Button>

                  <Button
                    icon="chevron-down"
                    onClick={() => {
                      setEditingState({
                        ...editingState,
                        fontSize: editingState.fontSize - 0.1,
                      });
                    }}
                  ></Button>
                </ButtonGroup>
              </FormGroup>
            </StyledInputsContainer>
            <StyledPreviewContainer>
              <StyledProjectorView
                useDemoText={true}
                activeResourcePointer={activeResourcePointer}
                className={''}
                previewMode={true}
                globalTheme={editingState}
              />
            </StyledPreviewContainer>
            {/* errors will return when field validation fails  */}
          </StyledBody>
        </div>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button
            icon="floppy-disk"
            type="submit"
            intent="primary"
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
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
      </div>
    </>
  );
};

export default ThemePanel;
