import styled from 'styled-components/macro';
import SlideResolver from '../../Slides/SlideResolver';
import Scrollbar from '../../../Common/Scrollbar/Scrollbar';
import ResourceHeader from './ResourceHeader/ResourceHeader';

const StyledSlidesContainer = styled.div`
  ${Scrollbar}
  padding-top: calc(50vh - 200px);
  padding-bottom: calc(50vh - 140px);
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

      <StyledSlidesContainer>
        <SlideResolver
          isActiveResource={isActiveResource}
          activeResourcePointer={activeResourcePointer}
          resource={resource}
        />
      </StyledSlidesContainer>
    </StyledResourceManager>
  );
};
export default ResourceManager;
