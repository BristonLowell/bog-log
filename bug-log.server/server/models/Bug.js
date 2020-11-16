import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema({
  closed: { type: Boolean, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  profile: { type: String, ref: 'Profile', required: true }, //The provided name for who reported the bug
  closedDate: { type: Date, required: false }
}, { timestamps: true, toJSON: { virtuals: true } })

Bug.virtual('creator', {
  localField: 'profile',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
export default Bug