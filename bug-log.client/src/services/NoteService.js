import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
class NoteService {
  async getNotes(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(bugId, newNote) {
    try {
      await api.post('api/bugs/' + bugId + '/notes', newNote)
      this.getNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteNote(bugId, noteId) {
    try {
      await api.delete('api/bugs/' + bugId + '/notes/' + noteId)
      this.getNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editNote(bugId, noteId, editedNote) {
    try {
      await api.put('api/bugs/' + bugId + '/notes/' + noteId, editedNote)
      this.getNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const noteService = new NoteService()
