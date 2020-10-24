import { get as getSongs } from '../../Storage/songsRepository';

export default function (searchTerm, allSongs) {
  return allSongs.filter(
    (s) =>
      s &&
      s.properties &&
      s.properties.title &&
      s.properties.title
        .toLowerCase()
        .includes(searchTerm && searchTerm.toLowerCase()),
  );
}
