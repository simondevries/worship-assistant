import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Classes,
  MenuItem,
  Menu,
  TabId,
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

export default ({ activeResourcePointer, onClose }) => {
  const [state] = useContext<Array<IState>>(Context);
  if (!state || !state.currentSchedule) return <div>NoState</div>;

  const [selectedTabId, setSelectedTabId] = useState<TabId>('main');

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
      textAlign: yup.string(),
      isBold: yup.boolean(),
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

  const [settings, setSettings] = useState(settingsRepo.get());
  const oldSettings = settings;
  const [chosenTheme, setChosenTheme] = useState(
    activeResource && activeResource.theme
      ? activeResource.theme
      : defaultSongTheme,
  );

  const ThemeSelect = Select.ofType<ITheme>();

  // const renderThemeMenu: ItemListRenderer<ITheme> = ({
  //   items,
  //   itemsParentRef,
  //   query,
  //   renderItem,
  // }) => {
  //   const renderedItems = items
  //     .map(renderItem)
  //     .filter((item) => item != null);
  //   return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>;
  // };

  // const renderThemeItem: ItemRenderer<ITheme> = (
  //   theme,
  //   { handleClick, modifiers },
  // ) => {
  //   if (!modifiers.matchesPredicate) {
  //     return null;
  //   }
  //   return (
  //     <MenuItem
  //       active={modifiers.active}
  //       text={theme.name}
  //       onClick={handleClick}
  //     />
  //   );
  // };
  useEffect(() => {
    async function fetchData() {
      const res = await settingsRepo.get();
      // setValue('fontSize', res.globalSlideTheme.fontSize);
      // setValue('textAlign', res.globalSlideTheme.textAlign);
      settingsRepo.set(res);
      setSettings(res);
    }
    fetchData();
  }, [setValue]);

  const onSubmit = (values) => {
    console.log({ values });

    // const newSetting = {
    //   ...settings,
    //   ...values,
    // };

    // settingsRepo.set(newSetting);
    // setSettings(newSetting);
  };

  register('isBold');
  register('isItalic');
  register('isUnderline');
  register('verticalAlign');
  register('horizontalAlign');

  // const { onChange: onIsBoldChange } = register('isBold');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Classes.DIALOG_BODY}>
          <br />
          <StyledBody>
            <StyledInputsContainer>
              {/* <ThemeSelect
                  items={themes}
                  itemRenderer={renderThemeItem}
                  itemListRenderer={renderThemeMenu}
                  itemPredicate={(query, item) =>
                    item.name
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  }
                  noResults={
                    <MenuItem disabled={true} text="No results." />
                  }
                  onItemSelect={handleThemeChange}
                >
                  <Button
                    text={chosenTheme.name}
                    rightIcon="double-caret-vertical"
                  />
                </ThemeSelect> */}

              <Button
                data-testid="bold"
                onClick={() => {
                  console.log('Hel;lowor');
                  setValue('isBold', true, { shouldValidate: true });
                }}
                active={getValues('isBold') === true}
              >
                B
              </Button>

              <Button
                onClick={() =>
                  setValue('isItalic', 'true', {
                    shouldValidate: true,
                  })
                }
              >
                I
              </Button>

              <Button
                onClick={() =>
                  setValue('isUnderlined', 'true', {
                    shouldValidate: true,
                  })
                }
              >
                U
              </Button>

              <div>
                <Button
                  onClick={() =>
                    setValue('horizontalAlign', 'L', {
                      shouldValidate: true,
                    })
                  }
                >
                  L
                </Button>

                <Button
                  onClick={() =>
                    setValue('horizontalAlign', 'M', {
                      shouldValidate: true,
                    })
                  }
                >
                  M
                </Button>

                <Button
                  onClick={() =>
                    setValue('horizontalAlign', 'R', {
                      shouldValidate: true,
                    })
                  }
                >
                  R
                </Button>
              </div>

              <div>
                <Button
                  onClick={() =>
                    setValue('verticalAlign', 'T', {
                      shouldValidate: true,
                    })
                  }
                >
                  T
                </Button>

                <Button
                  onClick={() =>
                    setValue('verticalAlign', 'M', {
                      shouldValidate: true,
                    })
                  }
                >
                  M
                </Button>

                <Button
                  onClick={() =>
                    setValue('verticalAlign', 'B', {
                      shouldValidate: true,
                    })
                  }
                >
                  B
                </Button>
              </div>
            </StyledInputsContainer>
            <StyledPreviewContainer>
              <ProjectorView
                previewMode={true}
                activeResourcePointer={activeResourcePointer}
                className={''}
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
                console.log('foo');
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
