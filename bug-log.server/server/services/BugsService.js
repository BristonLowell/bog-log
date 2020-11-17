import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BugsService {
  async getAllBugs(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('profile')
    if (!bugs) {
      throw new BadRequest('invalid request')
    }
    return bugs
  }

  async getBugById(bugId) {
    try {
      const bug = await dbContext.Bugs.findOne({ _id: bugId }).populate('profile')
      if (!bug) {
        throw new BadRequest('invalid id')
      }
      return bug
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(newBug) {
    return await dbContext.Bugs.create(newBug)
  }

  async editBug(userInfo, bugId, editedBug) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ profile: userInfo, _id: bugId }, editedBug)
    if (!bug) {
      throw new BadRequest('invalid id')
    }
    return bug
  }
}

export const bugsService = new BugsService()
