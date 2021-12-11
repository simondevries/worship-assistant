import { useEffect, useContext } from 'react';
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
import { ITheme } from '../../../../Interfaces/themes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Context } from '../../../../Common/Store/Store';
import { ISettings } from 'Interfaces/Settings';
import { State } from '@storybook/api';
import { ReducerAction } from 'Reducers/reducers';

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

// todo (sdv) this is in need of a refactor
const ThemePanel = ({ activeResourcePointer, onClose }) => {
  const [state, dispatch]: [State, (action: ReducerAction) => void] =
    useContext(Context);

  const schema = yup
    .object()
    .shape({
      isBold: yup.boolean().notRequired(),
      isUnderlined: yup.boolean().notRequired(),
      isItalic: yup.boolean().notRequired(),
      horizontalAlign: yup.string().notRequired(),
      verticalAlign: yup.string().notRequired(),
      fontSize: yup.string().notRequired(),
    })
    .required();

  const { handleSubmit, register, setValue, formState, getValues } =
    useForm({
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
        'isUnderlined',
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
      textIsUnderlined: getValues('isUnderlined'),
      textHorizontalAlign: getValues('horizontalAlign'),
      fontSize: getValues('fontSize'),
      backgroundColor: 'black',
      lineHeight: '1',
      name: 'default',
      textColor: 'white',
      fontFamily: 'Arial',
    };
  };

  const onSubmit = async () => {
    const settings = await settingsRepo.get();
    const newSetting: ISettings = {
      ...settings,
      globalSlideTheme: getThemeFromCurrentState(),
    };

    console.log({ newSetting });

    settingsRepo.set(newSetting, 'settings');
    dispatch({ type: 'setSettings', payload: settings });
    onClose();
  };

  register('isBold');
  register('isItalic');
  register('isUnderlined');
  register('verticalAlign');
  register('fontSize');
  register('horizontalAlign');

  if (!state || !state.currentSchedule) return <div>NoState</div>;

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
                      setValue('isBold', !getValues('isBold'), {
                        shouldValidate: true,
                      });
                    }}
                    active={getValues('isBold') === true}
                  >
                    B
                  </Button>

                  <Button
                    onClick={() =>
                      setValue('isItalic', !getValues('isItalic'), {
                        shouldValidate: true,
                      })
                    }
                    active={getValues('isItalic') === true}
                  >
                    I
                  </Button>

                  <Button
                    onClick={() =>
                      setValue(
                        'isUnderlined',
                        !getValues('isUnderlined'),
                        {
                          shouldValidate: true,
                        },
                      )
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

                      setValue('fontSize', currentFontSize + 0.1, {
                        shouldValidate: true,
                      });
                    }}
                  ></Button>

                  <Button
                    icon="chevron-down"
                    onClick={() => {
                      const currentFontSize =
                        getValues('fontSize') ?? 1;

                      setValue('fontSize', currentFontSize - 0.1, {
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
          </StyledBody>
        </div>
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
      </form>
    </>
  );
};

export default ThemePanel;
