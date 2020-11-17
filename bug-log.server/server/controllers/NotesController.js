import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/bugs/:bugId/notes')
    this.router
      .get('', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .put('/:noteId', this.editNote)
      .delete('/:noteId', this.deleteNote)
  }

  async getNotesByBugId(req, res, next) {
    try {
      res.send(await notesService.getNotesByBugId(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      req.body.bug = req.params.bugId
      req.body.flagged = false
      res.send(await notesService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      res.send(await notesService.editNote(req.params.noteId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      res.send(await notesService.deleteNote(req.userInfo.id, req.params.noteId))
    } catch (error) {
      next(error)
    }
  }
}
