import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
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
