import { getAller, getByKeyer, setter, deleter, adder } from './Repository'

const commonRepositoryBehaviour = self => Object.assign(
  {},
  getByKeyer(self),
  getAller(self),
  deleter(self),
  setter(self),
  adder(self),
)

function scheduleRepository(objectStoreType, permissions){
    let scheduleRepo = {
        
        objectStoreType,
        permissions,
    }

    return Object.assign(
        scheduleRepo,
        commonRepositoryBehaviour(scheduleRepo),
    )
}

export const scheduleRepo = scheduleRepository('schedule', 'readwrite');