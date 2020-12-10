import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, Classes, MenuItem } from '@blueprintjs/core';
import styled, { ThemeProvider } from 'styled-components';
import { settingsRepo } from '../../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { themes, defaultSongTheme } from './themes';
import { Select } from '@blueprintjs/select';

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

// const StyledProjectorView = styled(ProjectorView)`
//   height: 100%;
//   width: 100%;

// `;

export default ({ setSettingsModalOpen, activeResourcePointer }) => {
  const { handleSubmit, register, errors, setValue } = useForm();
  const [settings, setSettings] = useState({});
  const [chosenThemeName, setChosenThemeName] = useState(
    defaultSongTheme.name,
  );

  const ThemeSelect = Select.ofType();

  const handleThemeChange = (item) => {
    console.log({ item });
  };

  useEffect(() => {
    async function fetchData() {
      const res = await settingsRepo.get();
      setValue('fontSize', res.fontSize);
      setValue('textAlign', res.textAlign);
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
                    itemRenderer={(i) => (
                      <MenuItem text={i.name}></MenuItem>
                    )}
                    itemPredicate={(query, item) =>
                      item.name
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    }
                    noResults={
                      <MenuItem disabled={true} text="No results." />
                    }
                    // todo (sdv) why this borked
                    onItemSelect={() => {
                      console.log('I love chocolate');
                    }}
                  >
                    <Button
                      text={chosenThemeName}
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
                <ThemeProvider
                  theme={themes.find(
                    (theme) => theme.name === chosenThemeName,
                  )}
                >
                  <ProjectorView
                    previewMode={true}
                    activeResourcePointer={activeResourcePointer}
                    className={''}
                  />
                </ThemeProvider>
              </StyledPreviewContainer>
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && (
                <span>This field is required</span>
              )}
            </StyledBody>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={() => setSettingsModalOpen(false)}>
                Close
              </Button>
              <Button
                icon="floppy-disk"
                type="submit"
                intent="Primary"
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
