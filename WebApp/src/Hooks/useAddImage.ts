import { useContext } from 'react';
import { FilePickerType, openFile } from 'FileSystem/fileSystemTools';

import useEventHandler from "Events/Handlers/useEventHandler";
import getUrlFromFileHandle from "Helpers/getUrlFromFileHandle";
import newId from 'Helpers/newId';
import IState from 'Interfaces/State';
import { Context } from 'Common/Store/Store';
import addActiveImageEvent from 'Events/Domain/addActiveImageEvent';
import imageCreatedEvent from 'Events/Domain/imageCreatedEvent';

const useAddImage = () => {
    const [raiseEvent] = useEventHandler();
    const [state] = useContext(Context);

    const addImage = async () => {
        let fileHandle, url;
        try {
            fileHandle = await openFile(FilePickerType.Image);
            if (!fileHandle || fileHandle == null) {
                return;
            }
            url = await getUrlFromFileHandle(fileHandle);
        } catch (e: any) {
            if (e.name === 'AbortError') {
                return;
            }
            alert('An error occured on retrieving the image');
            console.warn(e);
            return;
        }
        const imageId = newId();

        raiseEvent(
            new imageCreatedEvent(
                false,
                imageId,
                (state as IState).searchBar.insertResourceAtIndex,
                fileHandle,
            ),
        );

        raiseEvent(new addActiveImageEvent(false, imageId, url));
    }

    return [addImage]
};

export default useAddImage;