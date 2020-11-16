import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bug: bugId }).populate('bug').populate('profile', '-updatedAt -subs')
    if (!notes) {
      throw new BadRequest('invalid id')
    }
    return notes
  }

  async createNote(newNote) {
    return await dbContext.Notes.create(newNote)
  }


  async editNote(userInfo, noteId, editedNote) {
    const note = await dbContext.Notes.findOneAndUpdate({ profile: userInfo, _id: noteId }, editedNote)
    if (!note) {
      throw new BadRequest('invalid id')
    }
    return note
  }

  async deleteNote(userInfo, noteId) {
    const note = await dbContext.Notes.findOneAndDelete({ profile: userInfo, _id: noteId })
    if (!note) {
      throw new BadRequest('invalid id')
    }
    return note
  }
}

export const notesService = new NotesService()