// import React, { useState, useEffect } from 'react';
// import { Button } from '@blueprintjs/core';
// import { Dialog, Classes } from '@blueprintjs/core';
// import styled, { css } from 'styled-components/macro';
// import { settingsRepo } from '../../Storage/settingsRepository';
// import { useForm } from 'react-hook-form';

// const StyledInput = styled.input`
//   margin-bottom: 10px;
// `;

// const StyledScrollableBody = styled.div`
//   /* overflow: auto; */
// `;

// export default ({ setSettingsModalOpen }) => {
//   const { handleSubmit, register, errors, setValue } = useForm();
//   const [settings, setSettings] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       const res = await settingsRepo.get();
//       setValue('fontSize', res.fontSize);
//       setValue('textAlign', res.textAlign);
//       settingsRepo.set(res);
//       setSettings(res);
//     }
//     fetchData();
//   }, []);

//   const StyledBody = styled.div`
//     /* display: flex;
//     flex-direction: column;

//     google-cast-launcher {
//       float: right;
//       margin: 10px 6px 14px 0px;
//       width: 40px;
//       height: 32px;
//       opacity: 0.7;
//       background-color: #000;
//       border: none;
//       outline: none;
//     }

//     google-cast-launcher:hover {
//       --disconnected-color: white;
//       --connected-color: white;
//     } */
//   `;

//   const onSubmit = (values) => {
//     setSettingsModalOpen(false);
//     const newSetting = {
//       ...settings,
//       ...values,
//     };

//     settingsRepo.set(newSetting);
//     setSettings(newSetting);
//   };

//   return (
//     <>
//       <Dialog
//         style={{ minWidth: '700px', width: '80vw' }}
//         className={Classes.DARK}
//         isOpen
//         title="Settings"
//         isCloseButtonShown={true}
//         onClose={() => setSettingsModalOpen(false)}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <StyledScrollableBody className={Classes.DIALOG_BODY}>
//             <StyledBody>
//               <StyledInput
//                 className={Classes.INPUT}
//                 name="fontSize"
//                 ref={register}
//                 placeholder="Font Size"
//               />
//               {/* include validation with required or other standard HTML validation rules */}
//               <StyledInput
//                 className={Classes.INPUT}
//                 name="textAlign"
//                 placeholder="Text Align"
//                 ref={register({ required: true })}
//               />
//               {/* errors will return when field validation fails  */}
//               {errors.exampleRequired && (
//                 <span>This field is required</span>
//               )}
//             </StyledBody>

//             <div className={Classes.DIALOG_FOOTER_ACTIONS}>
//               <Button onClick={() => setSettingsModalOpen(false)}>
//                 Close
//               </Button>
//               <Button
//                 icon="floppy-disk"
//                 type="submit"
//                 intent="Primary"
//               >
//                 Save
//               </Button>
//             </div>
//           </StyledScrollableBody>
//         </form>
//       </Dialog>
//     </>
//   );
// };
