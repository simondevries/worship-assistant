import React from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import SlideChangeEvent from '../../Events/Domain/slideChangeEvent';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

type Props = {
  children: JSX.Element;
  slideIndex: number;
  resourceId: string;
};

export default function ({
  children,
  slideIndex,
  resourceId,
}: Props) {
  const [raiseEvent] = useEventHandler();

  const onSlideClick = () => {
    // todo (Sdv) make generic for all slides

    raiseEvent(new SlideChangeEvent(false, resourceId, slideIndex));

    const element = document.getElementById(
      'slide' + 0 + 'resource' + resourceId,
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    } else {
      console.error('Could not find slide');
    }
  };

  return (
    <StyledCard
      id={`slide${slideIndex}resource${resourceId}`}
      onClick={onSlideClick}
      interactive={true}
      elevation={Elevation.TWO}
    >
      {children}
    </StyledCard>
  );
}
