import { getAller, getByKeyer, setter, deleter, adder } from './Repository'

const commonRepositoryBehaviour = self => Object.assign(
    {},
    getByKeyer(self),
    getAller(self),
    deleter(self),
    setter(self),
    adder(self),
  )
  

function songsRepository(objectStoreType, permissions){
    let songsRepo = {
        
        objectStoreType,
        permissions,
    }
    return Object.assign(
        songsRepo,
        commonRepositoryBehaviour(songsRepo),
    )
}

export const songsRepo = songsRepository('songs', 'readwrite');
