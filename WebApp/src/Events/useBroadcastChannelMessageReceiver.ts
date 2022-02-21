import useEventHandler from './Handlers/useEventHandler';
import AppEvent from './Domain/appEvent';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../Common/Store/Store';
import { crossBrowserMessageMapper } from './Domain/CrossBrowserMessage';

let bc = new BroadcastChannel('worshipAssistApp');


const useBroadcastChannelMessageReceiver = () => {
  const [raiseEvent] = useEventHandler();
  const [dispatch] = useContext(Context);
  const [eventsReceived, setEventsReceived] = useState<
    Array<AppEvent>
  >([]);

  useEffect(() => {
    bc.onmessage = function (channel) {
      const isCurrentWindowTheControllerWindow = window.location.pathname.indexOf('project') === -1;
      const isCurrentWindowTheProjectorWindow = window.location.pathname.indexOf('project') !== -1;
      const message = crossBrowserMessageMapper.toObject(channel.data);
      if (!message) {
        return
      }

      if (isCurrentWindowTheControllerWindow && message.isToProjector()) {
        return;
      }

      if (isCurrentWindowTheProjectorWindow && message.isToController()) {
        return;
      }

      raiseEvent(message.payload);


      //   if ((channel.data as string).startsWith(projectorDimensionsMessageKey)) {
      //     console.log('received', JSON.stringify(channel.data))
      //     const dimensionMessage = fromMessageToProjectorDimensionsMessage(channel.data)

      //     const action: SetCurrentProjectorSizeAction = { type: 'setCurrentProjectorSize', payload: { width: dimensionMessage.width, height: dimensionMessage.height } }
      //     dispatch(action)

      //     dispatch({
      //       type: 'hasProjectorsAttached',
      //       payload: true,
      //     });
      //   }

      //   return;
      // } else if ((channel.data as string).startsWith(projectorDimensionsMessageKey)) {
      //   return
      // }

      // if (channel.data === 'ping-controller-views-to-project') {
      //   bc.postMessage('ping-project-views--to-controller');
      // }
      // const event = JSON.parse(channel.data);
      // event.isExternalEvent = true;

      // /// start ppt hacks
      // if (event.focusOnPptIframe) {
      //   console.log('focusing');
      //   setTimeout(() => {
      //     console.log('focusing');
      //     document.getElementById('pptIframe').focus();
      //   }, 1000);
      // }
      // if (event.blobUrl) {
      //   ///  START TEMPORARY

      //   const videoPlayer = document.getElementById('videoPlayer');
      //   videoPlayer.src = event.blobUrl;
      //   videoPlayer.play();
      //   document.getElementById('videoPlayer').style.display =
      //     'block';

      //   // document.getElementById('videoPlayer').requestFullscreen();
      //   // if (videoPlayer.requestFullscreen)
      //   // videoPlayer.requestFullscreen();
      //   // else if (videoPlayer.webkitRequestFullscreen)
      //   //   videoPlayer.webkitRequestFullscreen();
      //   // else if (videoPlayer.msRequestFullScreen)
      //   //   videoPlayer.msRequestFullScreen();
      // } else {
      //   const ele = document.getElementById('videoPlayer');
      //   if (ele) {
      //     ele.style.display = 'none';
      //   }
      // }

      // const videoPlayer = document.getElementById('videoPlayer');
      // videoPlayer.src = uzz;

      /// END TEMPORARY

      setEventsReceived(eventsReceived.concat([message.payload]));
    };
  }, []);

  return [eventsReceived];
};

export default useBroadcastChannelMessageReceiver;