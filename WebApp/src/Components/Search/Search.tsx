/* eslint-disable jsx-a11y/accessible-emoji */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Context } from '../../App';
import styled from 'styled-components/macro';
import { Icon } from '@blueprintjs/core';
import SearchQuery from './searchQuery';
import { songsRepo } from '../../Storage/songsRepository';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../Events/Domain/songAddedToScheduleEvent';
import ISong from '../../Interfaces/Song';
import { fileSystemApp } from '../../FileSystem/fileSystemTools';
import VideoCreatedEvent from '../../Events/Domain/videoCreatedEvent';
import {
  initNewBibleVerse,
  addBibleVerseContent,
} from '../../Interfaces/BibleVerse';
import BibleVerseAddedToScheduleEvent from '../../Events/Domain/bibleVerseAddedToScheduleEvent';
import { isValidBibleVerse } from '../../BibleVerse/utils';
import newId from '../../Helpers/newId';
import useModal from '../Dialogs/useModal';
import AddSlideShowDialog from '../Dialogs/AddSlideShowDialog/AddSlideShowDialog';
import { bibleVerseResolver } from '../../BibleVerse/bibleVerseResolver';
import IState from '../../Interfaces/State';
import { userFileHandlerRepo } from '../../Storage/userFileHandlerRepository';
import AddSongDialog from '../Dialogs/UpsertSongDialog/AddSongDialog';
import AddActiveVideoEvent from '../../Events/Domain/addActiveVideoEvent';
import getUrlFromFileHandle from '../../Helpers/getUrlFromFileHandle';

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
  cursor: pointer;

  &:hover {
    background: #e6e6e6;
  }
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
  const [raiseEvent] = useEventHandler();
  const [isSlideShowModalOpen, setIsSlideShowModalOpen] = useModal();
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useModal();
  const searchbox = useRef<HTMLInputElement>(null);

  const onClose = () => {
    dispatch({
      type: 'setSearchVisible',
      payload: false,
    });
  };

  const addVideo = async () => {
    const fileHandle = await fileSystemApp.openFile();
    const url = await getUrlFromFileHandle(fileHandle);
    const videoId = newId();

    raiseEvent(
      new VideoCreatedEvent(
        false,
        videoId,
        (state as IState).searchBar.insertResourceAtIndex,
        fileHandle,
      ),
    );

    raiseEvent(new AddActiveVideoEvent(false, videoId, url));

    onClose();
  };

  const changeSlideShowModalVisiblity = (visibility) => {
    if (!visibility) {
      onClose();
    } else {
      setIsSlideShowModalOpen(true);
    }
  };

  const changeAddSongModalVisiblity = (isVisible) => {
    if (!isVisible) {
      onClose();
    } else {
      setIsAddSongModalOpen(true);
    }
  };

  const addSlideShow = () => {
    setIsSlideShowModalOpen(true);
  };

  const addBibleVerse = async () => {
    if (!searchbox)
      alert('Please enter a bible verse in the format John 3:16');

    const book = searchValue.split(' ')[0];
    const chapter = searchValue.split(' ')[1].split(':')[0];
    const verse = searchValue.split(' ')[1].split(':')[1];

    let bibleVerse = initNewBibleVerse(
      newId(),
      book,
      chapter,
      verse,
      'kjv',
      'bible-api.com',
      null,
    );

    const verseContent = await bibleVerseResolver(bibleVerse);

    bibleVerse = addBibleVerseContent(bibleVerse, verseContent);
    raiseEvent(
      new BibleVerseAddedToScheduleEvent(
        false,
        bibleVerse,
        (state as IState).searchBar.insertResourceAtIndex,
      ),
    );

    onClose();
  };

  const addSongToSchedule = async (song: ISong) => {
    raiseEvent(
      new SongAddedToScheduleEvent(
        (state as IState).searchBar.insertResourceAtIndex,
        false,
        song,
      ),
    );

    onClose();
  };

  useEffect(() => {
    if (
      searchbox != null &&
      searchbox.current !== null &&
      searchbox.current.focus !== null
    ) {
      searchbox.current.focus();
    }
    async function loadAllSongs() {
      const songs = await songsRepo.getAll();
      setAllSongs(songs);
    }
    loadAllSongs();
  }, []);

  const searchResult = SearchQuery(searchValue, allSongs);
  return (
    <>
      {!isSlideShowModalOpen && ! isAddSongModalOpen && (
        <>
          <StyledBackdrop onClick={onClose} />
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
                placeholder="Search song or Bible verse (e.g. Jn 3:16)"
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
              {!searchValue && (<StyledDropdownItem onClick={() =>
                setIsAddSongModalOpen(true)
              }>
                🎶 Add Song
              </StyledDropdownItem>)}
              {!searchValue && (<StyledDropdownItem onClick={() => addVideo()}>
                🎥 Add Video
              </StyledDropdownItem>)}
              {!searchValue ||
                searchValue === '' ||
                (isValidBibleVerse(searchValue) && (
                  <StyledDropdownItem onClick={() => addBibleVerse()}>
                    🕮 Add Bible Verse
                  </StyledDropdownItem>
                ))}
              {!searchValue && (<StyledDropdownItem onClick={() => alert('todo')}>
                📷 Add Image
              </StyledDropdownItem>)}

              {!searchValue && (<StyledDropdownItem onClick={addSlideShow}>
               🗠 Add slide show
              </StyledDropdownItem>)}
              {/* <StyledDropdownItem
              onClick={() =>
                addResource({
                  title:
                    'Jesse taking a photo of reuel taking a photo',
                  filePath:
                    'file:///C:/Users/simon/Pictures/2018/Camera/IMG_20181005_154404.jpg',
                  resourceType: 'IMAGE',
                } as IImage)
              }
            >
              📷 Add Photo
            </StyledDropdownItem> */}

              {searchResult &&
                searchResult.map((resource) => {
                  return (
                    <StyledDropdownItem
                      onClick={() => addSongToSchedule(resource)}
                    >
                      {resource.properties.title}
                    </StyledDropdownItem>
                  );
                })}
            </StyledDropdownContainer>
            {/* <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button> */}
          </StyledOmnibarContainer>{' '}
        </>
      )}
      {isSlideShowModalOpen && (
        <AddSlideShowDialog
          setModalOpen={changeSlideShowModalVisiblity}
          index={1} // todo (sdv)
        />
      )}
      {isAddSongModalOpen && (
        <AddSongDialog 
        setAddSongModalOpen={changeAddSongModalVisiblity} 
        createSongAtIndex={(state as IState).searchBar.insertResourceAtIndex}/>
      )}
    </>
  );
};
