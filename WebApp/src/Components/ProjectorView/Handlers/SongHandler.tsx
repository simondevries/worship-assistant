import styled from '@emotion/styled';
import IResourceReference from 'Interfaces/ResourceReference';
import ISongResourceReference from 'Interfaces/SongResourceReference';
import { ITheme } from 'Interfaces/themes';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { SongBuilder } from 'testBuilders/songBuilder';
import Song from '../../../Interfaces/Song';
import ISong from '../../../Interfaces/Song';

const SSongHandler = styled.div`
  height: 100%;
  overflow: hidden;
`;

interface Dimensions {
  width: number;
  height: number;
}

const useGetFontSize = (dimensions: Dimensions): string => {
  const ratio = dimensions.width * dimensions.height;
  console.log(ratio);

  const fontSize = ratio / (1000 + ratio / 800);

  return `${fontSize}%`;
};

export default ({
  resourceReference,
  slideIndex,
  activeSongs,
  globalTheme,
}: {
  resourceReference: IResourceReference;
  slideIndex: number;
  activeSongs: ISong[];
  globalTheme: ITheme;
}) => {
  const song =
    activeSongs.find((s) => s.id === resourceReference.id) ??
    undefined;

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const fontSize = useGetFontSize(dimensions);

  if (!song || song.lyrics.length <= slideIndex) {
    console.warn(
      `Could not find song for resource reference ${resourceReference}`,
    );
    return null;
  }

  useLayoutEffect(() => {
    setDimensions({
      width: containerRef.current?.offsetWidth ?? 0,
      height: containerRef.current?.offsetHeight ?? 0,
    });
  }, []);

  const content =
    song &&
    song.lyrics[slideIndex].content &&
    song.lyrics[slideIndex].content.split(/\r?\n/);

  return (
    <SSongHandler
      data-testid="songhandler-container"
      style={{
        fontSize: fontSize,
      }}
      ref={containerRef}
    >
      {content.map((c) => (
        <div data-testid="songhandler-newlineelement">{c}</div>
      ))}
    </SSongHandler>
  );
};
