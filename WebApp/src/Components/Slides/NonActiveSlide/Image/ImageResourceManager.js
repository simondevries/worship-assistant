import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';

export default function ({ resource, slideIndex, resourceId }) {
  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
    >
      <p>{resource.title}</p>
      <p>{resource.filePath}</p>
    </BaseNonActiveSlide>
  );
}
