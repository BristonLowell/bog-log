import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      const arr = res.data
      const arrTwo = []
      for (let i = 0; i < arr.length; i++) {
        const arrItem = arr[i]
        if (arrItem.closed === true) {
          const newArr = arr.splice(i, 1)
          const newObject = newArr.pop()
          arrTwo.push(newObject)
          i--
        }
      }
      AppState.bugs = arr.concat(arrTwo)
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(newBug) {
    try {
      await api.post('api/bugs', newBug)
      this.getBugs()
    } catch (error) {
      logger.error(error)
    }
  }

  async closeBug(bugId, closedBug) {
    await api.put('api/bugs/' + bugId, closedBug)
    this.getBugs()
  }

  async editBug(bugId, editedBug) {
    console.log('hello')
    await api.put('api/bugs/' + bugId, editedBug)
    this.getActiveBug(bugId)
  }
}

export const bugService = new BugService()
