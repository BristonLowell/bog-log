import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
  }

  async getAllBugs(req, res, next) {
    try {
      res.send(await bugsService.getAllBugs())
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      res.send(await bugsService.getBugById(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      req.body.closed = false
      res.send(await bugsService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      res.send(await bugsService.editBug(req.userInfo.id, req.params.bugId, req.body))
    } catch (error) {
      next(error)
    }
  }
}
