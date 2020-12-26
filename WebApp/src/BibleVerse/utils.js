export const isValidBibleVerse = (str) =>
  str &&
  str.match &&
  str.match(
    /(?:\d\s*)?[A-Z]?[a-z]+\s*\d+(?:[:-]\d+)?(?:\s*-\s*\d+)?(?::\d+|(?:\s*[A-Z]?[a-z]+\s*\d+:\d+))?/g,
  );
