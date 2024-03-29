/* eslint-disable jsx-a11y/accessible-emoji */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Context } from '../../Common/Store/Store';
import styled from 'styled-components/macro';
import { Icon, Spinner } from '@blueprintjs/core';
import SearchQuery from './searchQuery';
import { songsRepo } from '../../Storage/songsRepository';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../Events/Domain/songAddedToScheduleEvent';
import ISong from '../../Interfaces/Song/Song';
import VideoCreatedEvent from '../../Events/Domain/videoCreatedEvent';
import BibleVerseAddedToScheduleEvent from '../../Events/Domain/bibleVerseAddedToScheduleEvent';
import { isValidBibleVerse } from '../../BibleVerse/utils';
import newId from '../../Helpers/newId';
import useModal from '../Dialogs/useModal';
import AddSlideShowDialog from '../Dialogs/AddSlideShowDialog/AddSlideShowDialog';
import { bibleVerseResolver } from '../../BibleVerse/bibleVerseResolver';
import IState from '../../Interfaces/State';
import { userFileHandlerRepo } from '../../Storage/userFileHandlerRepository';
import AddSongDialog from '../Dialogs/UpsertSongDialog/AddSongDialog';
import getUrlFromFileHandle from '../../Helpers/getUrlFromFileHandle';
import BibleVerse, {
  BibleVerseContent,
  initNewBibleVerseQuery,
} from '../../Interfaces/BibleVerse';
import imageCreatedEvent from 'Events/Domain/imageCreatedEvent';
import addActiveImageEvent from 'Events/Domain/addActiveImageEvent';
import { FilePickerType, openFile } from 'FileSystem/fileSystemTools';
import useAddVideo from 'Hooks/useAddVideo';
import useAddImage from 'Hooks/useAddImage';

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

const StyledSpinner = styled(Spinner)`
  height: 100%;
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
  margin-right: 10px;

  &:hover {
    background: #e6e6e6;
  }
`;

const StyledNoResults = styled(StyledDropdownItem)`
  display: flex;
  justify-content: space-between;
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
  outline: none;
`;

const StyledSearchIcon = styled(Icon)``;
// const StyledInput = styled

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [allSongs, setAllSongs] = useState([]);
  const [isAddingBibleVerse, setIsAddingBibleVerse] =
    useState<boolean>(false);
  const [state, dispatch] = useContext(Context);
  // console.log('state is ', JSON.stringify(state));
  const [raiseEvent] = useEventHandler();
  const [isSlideShowModalOpen, setIsSlideShowModalOpen] = useModal();
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useModal();
  const searchbox = useRef<HTMLInputElement>(null);
  const [addVideo] = useAddVideo();
  const [addImage] = useAddImage();

  const onClose = () => {
    dispatch({
      type: 'setSearchVisible',
      payload: false,
    });
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

  const addBibleVerse = async (translation: string) => {
    if (
      !searchbox ||
      !isValidBibleVerse(searchValue) ||
      searchValue.indexOf(' ') === -1 ||
      searchValue.indexOf(':') === -1
    ) {
      alert('Please enter a bible verse in the format John 3:16');
      return;
    }

    setIsAddingBibleVerse(true);
    let verses: BibleVerseContent | undefined;
    try {
      verses = await bibleVerseResolver(searchValue, translation);
    } catch {
      alert('An error occured when loading the bible verse');
      return;
    }
    let bibleVerse = initNewBibleVerseQuery(
      newId(),
      translation,
      searchValue,
      verses,
    );

    setIsAddingBibleVerse(false);

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

    dispatch({ type: 'navigationArrowKeysEnabled', payload: false });

    return () => {
      dispatch({ type: 'navigationArrowKeysEnabled', payload: true });
    };
  }, []);

  const searchResult = SearchQuery(searchValue, allSongs);
  return (
    <>
      {!isSlideShowModalOpen && !isAddSongModalOpen && (
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
              {!isAddingBibleVerse && (
                <StyledRightArrowIcon
                  icon="arrow-right"
                  color="#5c7080"
                />
              )}
              {isAddingBibleVerse && <StyledSpinner size={30} />}
            </StyledOmnibarSearchboxContainer>
            <StyledDropdownContainer>
              {!searchValue && (
                <StyledDropdownItem
                  onClick={() => setIsAddSongModalOpen(true)}
                >
                  🎶 Create New Song
                </StyledDropdownItem>
              )}
              {!searchValue && (
                <StyledDropdownItem
                  onClick={() => {
                    addVideo(
                      (state as IState).searchBar
                        .insertResourceAtIndex ?? 0,
                    );
                    onClose();
                  }}
                >
                  🎥 Add Video
                </StyledDropdownItem>
              )}
              {(!searchValue || isValidBibleVerse(searchValue)) && (
                <StyledDropdownItem
                  onClick={() => addBibleVerse('kjv')}
                >
                  🕮 Add Bible Verse - King James Version (KJV)
                </StyledDropdownItem>
              )}
              {(!searchValue || isValidBibleVerse(searchValue)) && (
                <StyledDropdownItem
                  onClick={() => addBibleVerse('bbe')}
                >
                  🕮 Add Bible Verse - Basic English (BBE)
                </StyledDropdownItem>
              )}
              {(!searchValue || isValidBibleVerse(searchValue)) && (
                <StyledDropdownItem
                  onClick={() => addBibleVerse('web')}
                >
                  🕮 Add Bible Verse - World English (WEB)
                </StyledDropdownItem>
              )}
              {!searchValue && (
                <StyledDropdownItem
                  onClick={() => {
                    addImage(
                      (state as IState).searchBar
                        .insertResourceAtIndex ?? 0,
                    );
                    onClose();
                  }}
                >
                  📷 Add Image
                </StyledDropdownItem>
              )}

              {!searchValue && (
                <StyledDropdownItem onClick={addSlideShow}>
                  🗠 Add slide show
                </StyledDropdownItem>
              )}
              {/* <StyledDropdownItem
              onClick={() =>
                addResource({
                  title:
                  filePath:
                  resourceType: 'IMAGE',
                } as IImage)
              }
            >
              📷 Add Photo
            </StyledDropdownItem> */}

              {searchResult &&
                searchValue &&
                searchResult.map((resource) => {
                  return (
                    <StyledDropdownItem
                      onClick={() => addSongToSchedule(resource)}
                    >
                      {resource.properties.title}
                    </StyledDropdownItem>
                  );
                })}

              {!searchResult.length &&
                searchValue &&
                searchValue.length > 5 && (
                  <StyledNoResults
                    onClick={() => {
                      window.open(
                        `https://songselect.ccli.com/Search/Results?SongContent=&PrimaryLanguage=&Keys=&Themes=&List=&SearchText=${searchValue}`,
                      );
                    }}
                  >
                    Search CCLI for songs called '{searchValue}'
                    <Icon icon={'document-open'} />
                  </StyledNoResults>
                )}
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
          createSongAtIndex={
            (state as IState).searchBar.insertResourceAtIndex
          }
        />
      )}
    </>
  );
};

export default Search;
