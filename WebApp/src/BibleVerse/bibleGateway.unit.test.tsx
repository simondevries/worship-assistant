import { getBibleVerse } from './bibleGateway';

test('gets shortest bible verse in multiple translations', async () => {
  let queryResult = await getBibleVerse('Numbers 11:35-12:2', 'kjv');
  expect(queryResult.length).toBe(3); // note newline
  expect(queryResult[0].bookName).toBe('Numbers'); // note newline
  expect(queryResult[0].chapter).toBe(11); // note newline
  expect(queryResult[0].verse).toBe(35); // note newline
  expect(queryResult[0].text).toBe(
    'And the people journeyed from Kibroth-hattaavah unto Hazeroth; and abode at Hazeroth.\n',
  );

  queryResult = await getBibleVerse('Numbers 11:35-12:2', 'web');
  expect(queryResult[0].text).toBe(
    'From Kibroth Hattaavah the people traveled to Hazeroth; and they stayed at Hazeroth.\n',
  );
});
