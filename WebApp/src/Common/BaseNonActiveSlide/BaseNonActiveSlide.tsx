import React from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import SlideChangeEvent from '../../Events/Domain/slideChangeEvent';

const StyledCard = styled(Card)<any>`
  width: 300px;
  padding: 7px 10px;
  ${({ isSelectedSlide }) =>
    isSelectedSlide && `background: #565656 !important;`}}

  ${(props: any) =>
    !props.isFirstSlide
      ? 'border-top-left-radius: 0px; border-top-right-radius: 0px;'
      : ''}

  ${(props: any) =>
    !props.isLastSlide
      ? 'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;'
      : ''}
`;

type Props = {
  children: JSX.Element[] | JSX.Element;
  slideIndex: number;
  resourceId: string;
  className?: string;
  isFirstSlide?: boolean;
  isLastSlide?: boolean;
  isSelectedSlide?: boolean;
};

const BaseNonActiveSlide = ({
  children,
  slideIndex,
  resourceId,
  className,
  isFirstSlide,
  isLastSlide,
  isSelectedSlide,
}: Props) => {
  const [raiseEvent] = useEventHandler();

  const onSlideClick = () => {
    // todo (Sdv) make generic for all slides

    raiseEvent(new SlideChangeEvent(false, resourceId, slideIndex));
  };

  return (
    <StyledCard
      className={className}
      id={`slide${slideIndex}resource${resourceId}`}
      onClick={onSlideClick}
      interactive={true}
      elevation={isSelectedSlide ? Elevation.FOUR : Elevation.TWO}
      isFirstSlide={isFirstSlide}
      isLastSlide={isLastSlide}
      isSelectedSlide={isSelectedSlide}
    >
      {children}
    </StyledCard>
  );
};
export default BaseNonActiveSlide;
