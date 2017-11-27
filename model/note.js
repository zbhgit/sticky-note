
const mongoose = require('mongoose')

const { Schema } = mongoose

const NoteSchema = new Schema({
  userId: { type: Number,unique: true },
  content: { type: String },
  createTime: { type: Date, default: Date.now },
  pageX: { type: Number },
  pageY: { type: Number },
})
/**
 * 创建note
 * @param userId
 * @param content
 * @param createTime
 * @param pageX
 * @param pageY
 * 
 */
const NoteModel = mongoose.model('note', NoteSchema)

async function addNewNote(param) {
  const note = new NoteModel({
    userId: param.userId,
    content: param.content,
    pageX: param.pageX,
    pageY: param.pageY
  })
  const created = await note.save()
    .catch((err) => {
      throw Error('Error creating note')
    })
  return {
    id: created._id,
    userId: created.userId,
    content: created.content,
    createTime: created.createTime,
    pageX: created.pageX,
    pageY: created.pageY
  }
}
/**
 * 获取notes
 * @param {Number} userId
 */

async function getNotes(userId) {
  const notes = await NoteModel.find({userId: userId})
    .catch((err) => {
      throw new Error(`Error getting users from db${err}`);
    });
  return notes;
}

/**
 * 
 * @param {*} id 
 * @param {*} update 
 */
async function updateNoteById(id, update) {
  const result = await NoteModel.findByIdAndUpdate({ _id: id }, update, { new: true })
    .catch((err) => {
      console.log(err)
      throw new Error('error updating note by id')
    })
  return result
}
/**
 * 
 * @param {*} _id 
 */
async function removeANote(param) {
  const result = await NoteModel.deleteOne({_id: param.id})
    .catch((err) => {
      throw new Error('error removing note')
    })
  return result
}
module.exports = {
  model: NoteModel,
  addNewNote,
  getNotes,
  updateNoteById,
  removeANote,
}