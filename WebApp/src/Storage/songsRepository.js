import {
  getAller,
  getByKeyer,
  setter,
  deleter,
  adder,
} from './Repository';

const commonRepositoryBehaviour = (self) =>
  Object.assign(
    {},
    getByKeyer(self),
    getAller(self),
    deleter(self),
    setter(self),
    adder(self),
  );

function songsRepository(objectStoreType, permissions) {
  let songsRepo = {
    objectStoreType,
    permissions,
  };
  const songRepoBehaviour = (self) => ({
    get: (id) => {
      let _getter = Object.create(getByKeyer(self));
      return _getter.getByKey(id); //todo (wp
    },
  });
  return Object.assign(
    songsRepo,
    commonRepositoryBehaviour(songsRepo),
    songRepoBehaviour(songsRepo),
  );
}

export const songsRepo = songsRepository('songs', 'readwrite');
