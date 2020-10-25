import React, { useState, useEffect } from 'react';
import { Button } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled, { css } from 'styled-components/macro';
import {
  get as getSettings,
  set as setSettings,
} from '../../Storage/settingsRepository';
import { useForm } from 'react-hook-form';

const StyledInput = styled.input`
  margin-bottom: 10px;
`;

export default ({ setSettingsModalOpen }) => {
  const { handleSubmit, register, errors, setValue } = useForm();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log('fsdf');
      const res = await getSettings();
      setValue('fontSize', res.fontSize);
      setValue('textAlign', res.textAlign);
      setSettings(res);
    }
    fetchData();
  }, []);

  const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const onSubmit = (values) => {
    setSettingsModalOpen(false);
    const newSetting = {
      ...settings,
      ...values,
    };

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
