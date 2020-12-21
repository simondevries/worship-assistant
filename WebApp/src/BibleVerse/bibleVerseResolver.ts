import BibleVerse from '../Interfaces/BibleVerse';
import { getBibleVerse } from './bibleGateway';

export const bibleVerseResolver = async (
  bibleVerse: any,
): Promise<any> => {
  switch (bibleVerse.source) {
    case 'bible-api.com':
      return await getBibleVerse(bibleVerse);

    default:
      console.error(
        `No bible verse found for ${bibleVerse && bibleVerse.source}`,
      );
  }
};
