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

function userFileHandlerRepository(objectStoreType, permissions) {
  let userFileHandlerRepo = {
    objectStoreType,
    permissions,
  };
  const userFileHandlerRepoBehaviour = (self) => ({
    get: (id) => {
      let _getter = Object.create(getByKeyer(self));
      return _getter.getByKey(id); //todo (wp
    },
  });
  return Object.assign(
    userFileHandlerRepo,
    commonRepositoryBehaviour(userFileHandlerRepo),
    userFileHandlerRepoBehaviour(userFileHandlerRepo),
  );
}

export const userFileHandlerRepo = userFileHandlerRepository(
  'userFileHandler',
  'readwrite',
);
