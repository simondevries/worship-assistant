import React from 'react';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import useFitText from 'use-fit-text';
import ResourceReference from '../../../../Interfaces/ResourceReference';

interface Props {
  resource: ResourceReference;
  slideIndex: number;
  resourceId: string;
}

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export default function SlideShowSlide({
  resource,
  slideIndex,
  resourceId,
}: Props) {
  const { fontSize, ref } = useFitText();
  return (
    <div ref={ref} style={{ fontSize }}>
      <BaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
      >
        <>
          <StyledIframe
            title={resourceId}
            src={resource?.embeddedPowerPointUrl?.replaceAll(
              'amp;',
              '',
            )}
          />
        </>
      </BaseNonActiveSlide>
    </div>
  );
}
