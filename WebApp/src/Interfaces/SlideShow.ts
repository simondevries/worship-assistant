import IResource from './resource';
export default interface SlideShow extends IResource {
  embeddedPowerPointUrl: string;
}

export const isLastSlideSelected = () => true;

export const lastSlideIndex = () => 0;
