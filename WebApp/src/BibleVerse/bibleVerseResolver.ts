import { getBibleVerse } from './bibleGateway';

export enum BibleGatewayProvider {
  BibleApi
}

export const bibleVerseResolver = async (
  searchValue: string, translation: string,
): Promise<any> => {

  switch (BibleGatewayProvider.BibleApi) {
    case BibleGatewayProvider.BibleApi:
      return await getBibleVerse(searchValue, translation);

    default:
      console.error(
        `No bible verse found for ${searchValue}`,
      );
  }
}
