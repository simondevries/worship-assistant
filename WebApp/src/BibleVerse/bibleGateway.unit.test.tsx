import React from 'react';
import { getBibleVerse } from "./bibleGateway";
import BibleVerse from '../Interfaces/BibleVerse';


test('gets shortest bible verse in KJV', async () => {
  let sample = {
    id: '123',
    resourceType: 'BIBLEVERSE',
    book: 'John',
    chapter: '11',
    verse: '35',
    translation: "kjv",  // note KJV
    source: "",
    bibleVerseContent: "",
  } as BibleVerse;
  await expect(getBibleVerse(sample)).resolves.toBe('Jesus wept.\n');  // note newline
});
