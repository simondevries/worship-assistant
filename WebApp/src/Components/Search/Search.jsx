import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {
  Hotkey,
  Hotkeys,
  HotkeysTarget,
  Classes,
} from '@blueprintjs/core';
import styled from 'styled-components/macro';
import { Icon } from '@blueprintjs/core';
import SearchQuery from './searchQuery';
import { getAll as getAllSongs } from '../../Storage/songsRepository';

const StyledOmnibarContainer = styled.div`
  -webkit-filter: blur(0);
  filter: blur(0);
  opacity: 1;
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1),
    0 4px 8px rgba(16, 22, 26, 0.2),
    0 18px 46px 6px rgba(16, 22, 26, 0.2);
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1),
    0 4px 8px rgba(16, 22, 26, 0.2),
    0 18px 46px 6px rgba(16, 22, 26, 0.2);
  left: calc(50% - 250px);
  top: 20vh;
  width: 500px;
  position: fixed;
  z-index: 21;
  display: flex;
  flex-direction: column;
  color: black;
`;

const StyledOmnibarSearchboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0px 11px;
  align-items: center;
  width: 100%;
`;

const StyledBackdrop = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  opacity: 1;
  background-color: rgba(16, 22, 26, 0.7);
  overflow: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 20;
`;

const StyledDropdownItem = styled.div`
  height: 45px;
  align-items: center;
  display: flex;
  padding-left: 15px;
  border-top: 1px solid gray;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;
const StyledDropdownContainer = styled.div`
  background: white;
`;

const StyledRightArrowIcon = styled(Icon)``;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  margin: 0px 10px;
  border: transparent;
`;

const StyledSearchIcon = styled(Icon)``;
// const StyledInput = styled

export default function () {
  const [isVisible, setVisibility] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  });
  const handleKeyDown = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.keyCode === 27) {
      setVisibility(false);
    }

    if (event.keyCode === 191) {
      setVisibility(true);
    }
  };
  if (!isVisible) return null;

  return <Search setVisibility={setVisibility} />;
}

const Search = ({ setVisibility }) => {
  const [searchValue, setSearchValue] = useState(false);
  const [allSongs, setAllSongs] = useState([]);

  const searchbox = useRef(null);

  useEffect(() => {
    searchbox.current.focus();
    async function loadAllSongs() {
      const songs = await getAllSongs();
      setAllSongs(songs);
    }
    loadAllSongs();
  }, []);

  const searchResult = SearchQuery(searchValue, allSongs);
  return (
    <>
      <StyledBackdrop onClick={() => setVisibility(false)}>
        <StyledOmnibarContainer>
          <StyledOmnibarSearchboxContainer>
            {/* <span class="bp3-icon bp3-icon-search"></span> */}
            <StyledSearchIcon
              icon="search"
              color="#5c7080"
              iconSize={16}
            />
            <StyledInput
              type="text"
              placeholder="Add resource..."
              ref={searchbox}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <StyledRightArrowIcon
              icon="arrow-right"
              color="#5c7080"
            />
          </StyledOmnibarSearchboxContainer>
          <StyledDropdownContainer>
            {searchResult &&
              searchResult.map((song) => {
                return (
                  <StyledDropdownItem>
                    {song.properties.title}
                  </StyledDropdownItem>
                );
              })}
          </StyledDropdownContainer>
          {/* <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button> */}
        </StyledOmnibarContainer>
      </StyledBackdrop>
    </>
  );
};
