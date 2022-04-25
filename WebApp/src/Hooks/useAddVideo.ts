import { useContext } from 'react';
import { FilePickerType, openFile } from 'FileSystem/fileSystemTools';

import useEventHandler from "Events/Handlers/useEventHandler";
import getUrlFromFileHandle from "Helpers/getUrlFromFileHandle";
import newId from 'Helpers/newId';
import videoCreatedEvent from 'Events/Domain/videoCreatedEvent';
import IState from 'Interfaces/State';
import addActiveVideoEvent from 'Events/Domain/addActiveVideoEvent';
import { Context } from 'Common/Store/Store';

const useAddVideo = () => {
    const [raiseEvent] = useEventHandler();
    const [state] = useContext(Context);

    const addVideo = async (indexToAddAt: number) => {
        let fileHandle, url;
        try {
            fileHandle = await openFile(FilePickerType.Video);
            if (!fileHandle || fileHandle == null) {
                return;
            }
            url = await getUrlFromFileHandle(fileHandle);
        } catch (e: any) {
            if (e.name === 'AbortError') {
                return;
            }
            alert('An error occured on retrieving the video');
            console.warn(e);
            return;
        }
        const videoId = newId();

        raiseEvent(
            new videoCreatedEvent(
                false,
                videoId,
                indexToAddAt,
                fileHandle,
            ),
        );

        raiseEvent(new addActiveVideoEvent(false, videoId, url));
    }

    return [addVideo]
};

export default useAddVideo;