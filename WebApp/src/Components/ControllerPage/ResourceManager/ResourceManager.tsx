import styled from 'styled-components/macro';
import SlideResolver from '../../Slides/SlideResolver';
import Scrollbar from '../../../Common/Scrollbar/Scrollbar';
import ResourceHeader from './ResourceHeader/ResourceHeader';

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  height: 100%;
`;

const StyledSlidesContainer = styled.div`
  ${Scrollbar}

  overflow-y: auto;
  padding-right: 10px;
`;

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ResourceManager = ({
  resource,
  isActiveResource,
  activeResourcePointer,
}) => {
  return (
    <StyledResourceManager>
      <ResourceHeader resource={resource} />
      <StyledContentContainer>
        <StyledSlidesContainer>
          <SlideResolver
            isActiveResource={isActiveResource}
            activeResourcePointer={activeResourcePointer}
            resource={resource}
          />
        </StyledSlidesContainer>
      </StyledContentContainer>
    </StyledResourceManager>
  );
};
export default ResourceManager;
