import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, Classes } from '@blueprintjs/core';
import styled, { ThemeProvider } from 'styled-components';
import { settingsRepo } from '../../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';
import ProjectorView from '../../ProjectorView/ProjectorView'
import { themes } from './themes'


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
  const [chosenThemeIndex, setChosenThemeIndex] = useState("0");
  const handleThemeChange = (event) => {
    // let themeIndex = Number(event.currentTarget.value);
    setChosenThemeIndex(event.currentTarget.value);
  } 

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
                <div className={Classes.SELECT}>
                  <label for="slidetheme">Slide theme:</label>

                    <StyledSelect value={chosenThemeIndex} name="slidetheme" onChange={handleThemeChange}>
                      <option value="0">defaultTheme</option>
                      <option value="1">lightTheme</option>
                    </StyledSelect>
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
                <ThemeProvider theme={themes[Number(chosenThemeIndex)]}>
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
