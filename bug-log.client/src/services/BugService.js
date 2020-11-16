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
      AppState.ActiveBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugService = new BugService()
