const mongoose = require('mongoose')

const { Schema } = mongoose

const NoteSchema = new Schema({
  noteId: { type: Number },
  content: { type: String },
  createTime: { type: Date, default: Date.now },
  pageX: { type: Number },
  pageY: { type: Number },
})
/**
 * 创建note
 * @param noteId
 * @param content
 * @param createTime
 * @param pageX
 * @param pageY
 * 
 */
const NoteModel = mongoose.model('note', NoteSchema)

async function addNewNote(param) {
  const note = new NoteModel({
    noteId: param.noteId,
    content: param.content,
    pageX: param.pageX,
    pageY: param.pageY
  })
  const created = await note.save()
    .catch((err) => {
      throw Error('Error creating note')
    })
  return {
    noteId: created.noteId,
    content: created.content,
    createTime: created.createTime,
    pageX: created.pageX,
    pageY: created.pageY
  }
}
/**
 * 获取notes
 * @param none
 */

async function getNotes() {
  const notes = await NoteModel.find({})
  .catch((err) => {
    throw new Error(`Error getting users from db${err}`);
  });
return notes;
}
module.exports = {
  model: NoteModel,
  addNewNote,
  getNotes,
}