import { debounce } from 'Helpers/debounce';
import { ITheme } from 'Interfaces/themes';
import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import getInverseColor from './getInverseColor';

interface SSHandlerProps {
  theme: ITheme;
  inverseFontColor: string;
}

const StyledFooter = styled.div`
  height: 5%;
  color: black;
  text-align: right;
  padding-right: 1%;
`;

const StyledScreenSizeContent = styled.div`
  height: 95%;
  overflow: hidden;
`;

const SSongHandler = styled.div<SSHandlerProps>`
  word-wrap: break-word;
  white-space: break-spaces;
  height: 100%;
  width: 100%;
  overflow: hidden;
  text-align: ${({ theme }) => {
    return theme.textHorizontalAlign === 'L'
      ? 'left'
      : theme.textHorizontalAlign === 'M'
      ? 'center'
      : 'right';
  }};
  color: ${({ theme }) => theme.textColor};
  text-decoration: ${({ theme }) =>
    theme.textIsUnderlined ? 'underline' : 'none'};
  font-style: ${({ theme }) =>
    theme.textIsItalic ? 'italic' : 'none'};
  font-weight: ${({ theme }) => (theme.textIsBold ? 'bold' : 'none')};
  font-family: ${({ theme }) => theme.fontFamily ?? 'Arial'};
  display: flex;
  justify-content: ${({ theme }) => {
    return theme.textVerticalAlign === 'T'
      ? 'start'
      : theme.textVerticalAlign === 'M'
      ? 'center'
      : 'end';
  }};
  ${({ theme }) => {
    return (
      theme.backgroundImageUri &&
      `background-image: url(${theme.backgroundImageUri});
      background-repeat: no-repeat;
      background-size: cover;`
    );
  }}
  flex-direction: column;
  ${({ theme, inverseFontColor }) => {
    return theme.showTextBorder === false
      ? ''
      : `text-shadow: 2px 0 0 ${inverseFontColor},
    -2px 0 0 ${inverseFontColor},
    0 2px 0 ${inverseFontColor},
    0 -2px 0 ${inverseFontColor},
    1px 1px ${inverseFontColor},
    -1px -1px 0 ${inverseFontColor},
    1px -1px 0 ${inverseFontColor},
    -1px 1px 0 ${inverseFontColor};`;
  }}

  background: ${({ theme }) =>
    (!theme.backgroundImageUri && theme.backgroundColor) ?? 'black'};
`;

interface Dimensions {
  width: number;
  height: number;
}

const useGetFontSize = (
  dimensions: Dimensions,
  configuredFontSize: number,
): number => {
  const currentFontSizeBeforeScaling = configuredFontSize * 5; // we'll be working with pt here

  const heightMultiplier = dimensions.height / 100;
  const currentFontSize =
    currentFontSizeBeforeScaling * heightMultiplier;

  return currentFontSize; // assumsed caller uses pt
};

const GenericTextHandler = ({
  text,
  globalTheme,
  footer,
}: {
  text: string;
  footer?: string;
  globalTheme: ITheme;
}) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const fontSize = useGetFontSize(dimensions, globalTheme.fontSize);
  const footerFontSize = fontSize / 2.5;
  useLayoutEffect(() => {
    function updateSize() {
      setDimensions({
        width: containerRef.current?.offsetWidth ?? 0,
        height: containerRef.current?.offsetHeight ?? 0,
      });
    }
    window.addEventListener(
      'resize',
      debounce(updateSize, 400, false),
    );
    updateSize();
  }, []);

  return (
    <SSongHandler
      data-testid="songhandler-container"
      style={{
        fontSize: `${fontSize}pt`,
      }}
      theme={globalTheme}
      inverseFontColor={
        getInverseColor(globalTheme.textColor) ?? 'black'
      }
      ref={containerRef}
    >
      <StyledScreenSizeContent>{text}</StyledScreenSizeContent>
      {footer && (
        <StyledFooter style={{ fontSize: `${footerFontSize}pt` }}>
          {footer}
        </StyledFooter>
      )}
    </SSongHandler>
    // </div>
  );
};

export default GenericTextHandler;
