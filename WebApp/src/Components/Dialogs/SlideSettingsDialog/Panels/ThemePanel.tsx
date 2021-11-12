import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Classes,
  ButtonGroup,
  MenuItem,
  Menu,
  TabId,
  FormGroup,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { settingsRepo } from '../../../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';
import ProjectorView from '../../../ProjectorView/ProjectorView';
import {
  themes,
  ITheme,
  defaultSongTheme,
} from '../../../../Interfaces/themes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ItemListRenderer,
  ItemRenderer,
  Select,
} from '@blueprintjs/select';
import IState from '../../../../Interfaces/State';
import ISongResourceReference from '../../../../Interfaces/SongResourceReference';
import { Context } from '../../../../Common/Store/Store';
import { ISettings } from 'Interfaces/Settings';

const StyledInput = styled.input`
  margin-bottom: 10px;
`;

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
  width: 100%;
`;

const StyledProjectorView = styled(ProjectorView)`
  width: 500px;
`;

export default ({ activeResourcePointer, onClose }) => {
  const [state] = useContext<Array<IState>>(Context);
  if (!state || !state.currentSchedule) return <div>NoState</div>;

  const resourceReference =
    state &&
    state.currentSchedule &&
    state.currentSchedule.resources.find(
      (r) => r.index === activeResourcePointer.resourceIndex,
    );

  const songReference = resourceReference as ISongResourceReference;

  const activeResource =
    state &&
    state.currentSchedule &&
    state.currentSchedule.activeSongs.find(
      (s) => s?.id === songReference?.id,
    );

  const schema = yup
    .object()
    .shape({
      isBold: yup.boolean().notRequired(),
      isUnderlined: yup.boolean().notRequired(),
      isItalic: yup.boolean().notRequired(),
      horizontalAlign: yup.string().notRequired(),
      verticalAlign: yup.string().notRequired(),
      fontSize: yup.number().notRequired(),
    })
    .required();

  const {
    handleSubmit,
    register,
    setValue,
    formState,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { isValid } = formState;

  useEffect(() => {
    async function fetchData() {
      const res: ISettings = await settingsRepo.get('settings');
      setValue('isBold', res.globalSlideTheme.textIsBold ?? false);
      setValue(
        'isItalic',
        res.globalSlideTheme.textIsItalic ?? false,
      );
      setValue(
        'isUnderline',
        res.globalSlideTheme.textIsUnderlined ?? false,
      );
      setValue(
        'verticalAlign',
        res.globalSlideTheme.textVerticalAlign ?? 'M',
      );
      setValue(
        'horizontalAlign',
        res.globalSlideTheme.textHorizontalAlign ?? 'M',
      );
      setValue('fontSize', res.globalSlideTheme.fontSize ?? 1);
    }
    fetchData();
  }, []);

  const getThemeFromCurrentState = (): ITheme => {
    return {
      textVerticalAlign: getValues('verticalAlign'),
      textIsBold: getValues('isBold'),
      textIsItalic: getValues('isItalic'),
      textIsUnderlined: getValues('isUnderline'),
      textHorizontalAlign: getValues('horizontalAlign'),
      fontSize: getValues('fontSize'),
      backgroundColor: 'black',
      lineHeight: '1',
      name: 'default',
      textColor: 'white',
    };
  };

  const onSubmit = async (values) => {
    const settings = await settingsRepo.get();
    const newSetting: ISettings = {
      ...settings,
      globalSlideTheme: getThemeFromCurrentState(),
    };

    console.log({ newSetting });

    settingsRepo.set(newSetting, 'settings');
    onClose();
  };

  register('isBold');
  register('isItalic');
  register('isUnderline');
  register('verticalAlign');
  register('fontSize');
  register('horizontalAlign');

  // const { onChange: onIsBoldChange } = register('isBold');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Classes.DIALOG_BODY}>
          <br />
          <StyledBody>
            <StyledInputsContainer>
              <FormGroup label="Font">
                <ButtonGroup>
                  <Button
                    data-testid="bold"
                    onClick={() => {
                      setValue('isBold', true, {
                        shouldValidate: true,
                      });
                    }}
                    active={getValues('isBold') === true}
                  >
                    B
                  </Button>

                  <Button
                    onClick={() =>
                      setValue('isItalic', true, {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('isItalic') === true}
                  >
                    I
                  </Button>

                  <Button
                    onClick={() =>
                      setValue('isUnderlined', 'true', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('isUnderlined') === true}
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
                      setValue('horizontalAlign', 'L', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('horizontalAlign') === 'L'}
                  ></Button>

                  <Button
                    icon="align-center"
                    onClick={() =>
                      setValue('horizontalAlign', 'M', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('horizontalAlign') === 'M'}
                  ></Button>

                  <Button
                    icon="align-right"
                    onClick={() =>
                      setValue('horizontalAlign', 'R', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('horizontalAlign') === 'R'}
                  ></Button>
                </ButtonGroup>
              </FormGroup>
              <FormGroup label="Vertical Align">
                <ButtonGroup>
                  <Button
                    icon="caret-up"
                    onClick={() =>
                      setValue('verticalAlign', 'T', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('verticalAlign') === 'T'}
                  ></Button>

                  <Button
                    icon="alignment-horizontal-center"
                    onClick={() =>
                      setValue('verticalAlign', 'M', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('verticalAlign') === 'M'}
                  ></Button>

                  <Button
                    icon="caret-down"
                    onClick={() =>
                      setValue('verticalAlign', 'B', {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('verticalAlign') === 'B'}
                  ></Button>
                </ButtonGroup>
              </FormGroup>
              <FormGroup label="Font Size">
                <ButtonGroup>
                  <Button
                    icon="chevron-up"
                    onClick={() => {
                      const currentFontSize =
                        getValues('fontSize') ?? 1;

                      setValue('fontSize', currentFontSize + 5, {
                        shouldValidate: true,
                      });
                    }}
                  ></Button>

                  <Button
                    icon="chevron-down"
                    onClick={() => {
                      const currentFontSize =
                        getValues('fontSize') ?? 50;

                      setValue('fontSize', currentFontSize - 5, {
                        shouldValidate: true,
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
                globalTheme={getThemeFromCurrentState()}
              />
            </StyledPreviewContainer>
            {/* errors will return when field validation fails  */}

            {isValid && <div>This page has errors</div>}
          </StyledBody>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button
              icon="floppy-disk"
              type="submit"
              intent="primary"
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
