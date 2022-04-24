import React, { useState, useContext } from 'react';
import {
  Dialog,
  Classes,
  Button,
} from '@blueprintjs/core';
import IState from 'Interfaces/State';
import { Context } from 'Common/Store/Store';
import styled from '@emotion/styled';
import { ImageResults } from './ImageResult';

const StyledImageContainer = styled.div<{ isSelected: boolean }>`
  border: 2px solid transparent;
  ${({ isSelected }) =>
    isSelected &&
    `
        border: 2px solid white;
    `}
  position: relative;
  img {
    cursor: pointer;
  }
  input {
    position: absolute;
    left: 0px;
    width: 15px;
    height: 15px;
  }
  .author {
    padding-left: 6px;
    display: none;
    font-size: 10px;
    background: #4b4b4bc7;
    color: white;
    position: absolute;
    bottom: 0px;
    width: 100%;
  }

  &:hover {
    .author {
      display: block;
    }
  }
`;

const StyledImageResultWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

const StyledDialog = styled(Dialog)`
  min-width: 700px;
  width: fit-content;
  max-width: 80vw;

  .bp3-tab-panel {
    flex-grow: 1;
  }
`;

const ImageSelectionDialog = ({
  onImageSelected,
  onClose,
}: {
  onImageSelected: (uri: string) => void;
  onClose: () => void;
}) => {
  const [state] = useContext<Array<IState>>(Context);
  const [searchValue, setSearchValue] = useState<string>();
  const [searchResults, setSearchResults] = useState<ImageResults>();
  const [selectedImageId, setSelectedImageId] = useState<string>();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
  if (!state || !state.currentSchedule) return <div>Nostate</div>;

  const getImagesFromApi = async () => {
    const result = await fetch(
      `https://api.unsplash.com/search/photos?photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}&orientation=landscape&per_page=30`,
    );

    const res: ImageResults = await result.json();
    setSearchResults(res);
  };

  return (
    <>
      <StyledDialog
        className={Classes.DARK}
        isOpen
        title="Image selection"
        isCloseButtonShown={true}
        onClose={onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <StyledSearchContainer>
            <StyledInput
              type="search"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className={Classes.INPUT}
              placeholder="Enter search term. Try 'smoke'"
            />

            <Button onClick={getImagesFromApi}>Search</Button>
          </StyledSearchContainer>
          <StyledImageResultWrapper>
            {searchResults?.results.map((res) => {
              return (
                <StyledImageContainer
                  isSelected={res.id === selectedImageId}
                >
                  <img
                    src={res.urls.thumb}
                    onClick={() => {
                      setSelectedImageId(res.id);
                      setSelectedImageUrl(res.urls.full);
                    }}
                    alt={res.alt_description}
                  />
                  {res.id === selectedImageId && (
                    <input type="checkbox" checked />
                  )}
                  <div className="author">
                    Image by{' '}
                    <a
                      rel="noopener noreferrer"
                      href={res?.user?.links?.html ?? ''}
                      target="_blank"
                    >
                      {res?.user?.username ?? ''}
                    </a>{' '}
                    on{' '}
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={'https://unsplash.com/'}
                    >
                      Unsplash
                    </a>
                  </div>
                </StyledImageContainer>
              );
            })}
          </StyledImageResultWrapper>
        </div>{' '}
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button
            disabled={!selectedImageUrl}
            icon="floppy-disk"
            type="submit"
            intent="primary"
            onClick={() => {
              selectedImageUrl && onImageSelected(selectedImageUrl);
              onClose();
            }}
          >
            Select
          </Button>
        </div>
      </StyledDialog>
    </>
  );
};

export default ImageSelectionDialog;
