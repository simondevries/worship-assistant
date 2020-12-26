import useEventHandler from './Events/Handlers/useEventHandler';
import AppEvent from './Events/Domain/appEvent';
import { useEffect, useState } from 'react';

let bc = new BroadcastChannel('worshipAssistApp');

export default () => {
  const [raiseEvent] = useEventHandler();
  const [eventsReceived, setEventsRecieved] = useState<
    Array<AppEvent>
  >([]);

  useEffect(() => {
    bc.onmessage = function (channel) {
      if (window.location.pathname.indexOf('project') === -1) return;

      const event = JSON.parse(channel.data);
      event.isExternalEvent = true;
      raiseEvent(event);

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

      setEventsRecieved(eventsReceived.concat([event]));
    };
  }, []);

  return [eventsReceived];
};
