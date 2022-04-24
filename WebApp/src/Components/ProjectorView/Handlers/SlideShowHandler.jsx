import styled from 'styled-components';

const StyledSlideShowPlayer = styled.iframe`
  width: 100%;
  height: 100%;
`;

// interface Props {
//   resourceReference: ResourceReference;
// }

const slideShowHandler = ({ resourceReference }) => {
  return (
    <StyledSlideShowPlayer
      id={`focusable-object--${resourceReference.id}`}
      src={resourceReference.embeddedPowerPointUrl.replaceAll(
        'amp;',
        '',
      )}
    ></StyledSlideShowPlayer>
  );
};

export default slideShowHandler;
