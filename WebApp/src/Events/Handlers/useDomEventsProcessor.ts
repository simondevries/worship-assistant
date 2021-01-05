import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';
import VideoModeChangeEvent, {
  VideoMoodeChangeEventName,
} from '../Domain/VideoModeChangeEvent';

const useDomEventsProcessor = () => {
  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (event.eventType !== SlideChangedEventName) return;

    const element = document.getElementById(
      'slide' + event.slideIndex + 'resource' + event.resourceId,
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    } else {
      console.error('Could not find slide');
    }

    setTimeout(() => {
      const element = document.getElementById(
        'focusable-object--' + event.resourceId,
      );
      if (!element) {
        console.warn('Could not find focusable object!');
        return;
      }
      element?.focus();
    }, 1000);
  };

  const VideoModeChangeEvent = (
    videoModeChangeEvent: VideoModeChangeEvent,
  ) => {
    if (videoModeChangeEvent.eventType === VideoMoodeChangeEventName)
      return;

    const element: any = document.getElementById(
      `videoPlayer-${videoModeChangeEvent.resourceId}`,
    );

    if (!element) {
      console.warn(
        `Could not find element with Id ${`videoPlayer-${videoModeChangeEvent.resourceId}`}`,
      );
      return;
    }

    switch (videoModeChangeEvent.action) {
      case 'PLAY':
        element.play();
        break;
      case 'PAUSE':
        element.pause();
        break;
      case 'STOP':
        element.load();
        break;
      case 'BACKTOSTART':
        element.load();
        break;

      default:
        console.warn(
          `Could not find video mode change event action ${videoModeChangeEvent.action}`,
        );
    }
  };

  const arr = [SlideChangeEventHandler, VideoModeChangeEvent];
  return [arr];
};

export default useDomEventsProcessor;
