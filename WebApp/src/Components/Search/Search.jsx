import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Context } from '../../App';
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
import NewId from '../../Helpers/newId';
import { set as setSchedule } from '../../Storage/scheduleRepository';

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
  return <Search />;
}

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [allSongs, setAllSongs] = useState([]);
  const [state, dispatch] = useContext(Context);

  const searchbox = useRef(null);

  const onClose = () => {
    dispatch({
      type: 'setSearchVisible',
      payload: false,
    });
  };

  const addResource = (song) => {
    // todo (sdv).... ummm.... yuck too much going on here. Forced to do this becuase useReducer dowes not allow async await... maybe use redux oneday?

    const newResource = {
      id: NewId(),
      properties: {
        title: song.properties.title,
      },
      lyrics: [{ content: song.lyrics }],
    };

    const updatedSchedule = {
      ...state.currentSchedule,
      resources: state.currentSchedule.resources.concat({
        ...newResource,
        index: state.currentSchedule.resources.length,
      }),
    };

    dispatch({
      type: 'setCurrentSchedule',
      payload: updatedSchedule,
    });

    setSchedule(updatedSchedule);

    onClose();
  };

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
      <StyledBackdrop onClick={onClose}>
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
              searchResult.map((resource) => {
                return (
                  <StyledDropdownItem
                    onClick={() => addResource(resource)}
                  >
                    {resource.properties.title}
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
