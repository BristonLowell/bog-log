import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: String, ref: 'Bug', required: true },
  profile: { type: String, ref: 'Profile', required: true }, // The provided name for who reported the Note
  flagged: { type: Boolean, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'profile',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

Note.virtual('creator', {
  localField: 'bug',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})
export default Note
