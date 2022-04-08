import { ISettings } from '../Interfaces/Settings';
import { defaultTheme } from '../Interfaces/themes';
import { getAller, getByKeyer, setter, deleter, adder } from './Repository'

const commonRepositoryBehaviour = self => Object.assign(
  {},
  getByKeyer(self),
  getAller(self),
  deleter(self),
  setter(self),
  adder(self),
)


function settingsRepository(objectStoreType, permissions) {
  let settingsRepo = {
    objectStoreType,
    permissions,
  }
  const settingsRepositoryBehaviour = self => ({
    setCurrentService: async function (currentScheduleId) {
      let _getter = Object.create(getByKeyer(self));
      let _setter = Object.create(setter(self));
      const settings = await _getter.getByKey(currentScheduleId);
      const nSettings = {
        ...settings,
        currentScheduleId: currentScheduleId,
        globalSlideTheme: defaultTheme,
      } as ISettings;
      await _setter.set(nSettings, 'settings'); //todo (wp) not sure we want key to be just 'settings' 
    },

    get: function () {
      let _getter = Object.create(getByKeyer(self));
      return _getter.getByKey('settings') || {}; //todo (wp) not sure we want key to be just 'settings'
    }
  })
  return Object.assign(
    settingsRepo,
    commonRepositoryBehaviour(settingsRepo),
    settingsRepositoryBehaviour(settingsRepo),
  )
}

export const settingsRepo = settingsRepository('settings', 'readwrite');
