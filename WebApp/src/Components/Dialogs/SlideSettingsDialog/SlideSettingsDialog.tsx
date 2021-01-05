import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Dialog,
  Classes,
  MenuItem,
  Menu,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { settingsRepo } from '../../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';
import ProjectorView from '../../ProjectorView/ProjectorView';
import {
  themes,
  ITheme,
  defaultSongTheme,
} from '../../../Interfaces/themes';
import {
  ItemListRenderer,
  ItemRenderer,
  Select,
} from '@blueprintjs/select';
import IState from '../../../Interfaces/State';
import { Context } from '../../../App';
import ISongResourceReference from '../../../Interfaces/SongResourceReference';

const StyledInput = styled.input`
  margin-bottom: 10px;
`;

const StyledSelect = styled.select`
  margin-bottom: 10px;
`;

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const StyledPreviewContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default ({ setSettingsModalOpen, activeResourcePointer }) => {
  const [state] = useContext<Array<IState>>(Context);
  if (!state || !state.currentSchedule) return null;

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
      (s) => s.id === songReference.id,
    );
  const { handleSubmit, register, errors, setValue } = useForm();
  const [settings, setSettings] = useState(settingsRepo.get());
  const oldSettings = settings;
  const [chosenTheme, setChosenTheme] = useState(
    activeResource && activeResource.theme
      ? activeResource.theme
      : defaultSongTheme,
  );

  const ThemeSelect = Select.ofType<ITheme>();

  const renderThemeMenu: ItemListRenderer<ITheme> = ({
    items,
    itemsParentRef,
    query,
    renderItem,
  }) => {
    const renderedItems = items
      .map(renderItem)
      .filter((item) => item != null);
    return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>;
  };

  const renderThemeItem: ItemRenderer<ITheme> = (
    theme,
    { handleClick, modifiers },
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        text={theme.name}
        onClick={handleClick}
      />
    );
  };

  const handleThemeChange = (item: ITheme) => {
    setValue('blueprintSelect', item);
    setChosenTheme(item);
    if (activeResource && activeResource.theme) {
      activeResource.theme = item;
    } else {
      throw Error('activeResource is undefined!');
    }
  };

  const handleClose = () => {
    setSettings(oldSettings);
    setSettingsModalOpen(false);
  };

  const handleSave = () => {
    // setSettingsModalOpen(false);
    // const newSetting = {
    //   ...settings,
    //   ...values,
    // };
    // settingsRepo.set(newSetting);
    // setSettings(newSetting);
  };

  useEffect(() => {
    register({ name: 'blueprintSelect' });
  }, [register]);

  useEffect(() => {
    async function fetchData() {
      const res = await settingsRepo.get();
      setValue('fontSize', res.globalSlideTheme.fontSize);
      setValue('textAlign', res.globalSlideTheme.textAlign);
      settingsRepo.set(res);
      setSettings(res);
    }
    fetchData();
  }, [setValue]);

  const StyledBody = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const onSubmit = (values) => {
    setSettingsModalOpen(false);
    const newSetting = {
      ...settings,
      ...values,
    };

    settingsRepo.set(newSetting);
    setSettings(newSetting);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Settings"
        isCloseButtonShown={true}
        onClose={() => setSettingsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Classes.DIALOG_BODY}>
            <StyledBody>
              <StyledInputsContainer>
                <div>
                  <ThemeSelect
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
                  </ThemeSelect>
                </div>
                <StyledInput
                  className={Classes.INPUT}
                  name="fontSize"
                  ref={register}
                  placeholder="Font Size"
                />
                {/* include validation with required or other standard HTML validation rules */}
                <StyledInput
                  className={Classes.INPUT}
                  name="textAlign"
                  placeholder="Text Align"
                  ref={register({ required: true })}
                />
              </StyledInputsContainer>
              <StyledPreviewContainer>
                <ProjectorView
                  previewMode={true}
                  activeResourcePointer={activeResourcePointer}
                  className={''}
                />
              </StyledPreviewContainer>
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && (
                <span>This field is required</span>
              )}
            </StyledBody>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={handleClose}>Close</Button>
              <Button
                icon="floppy-disk"
                type="submit"
                intent="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};
