var express = require('express');
var router = express.Router();
const Note = require('../model/note')
/* GET users listing. */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      let notes = await Note.getNotes();
      return {
        notes,
      };
    })().then((r) => {
      res.json({
        code: 0,
        notes: r.notes,
      });
    }).catch((e) => {
      next(e);
    });
  })
  .post((req, res, next) => {
    (async () => {
      const note = await Note.addNewNote({
        noteId: req.body.noteId,
        content: req.body.content,
        pageX: req.body.pageX,
        pageY: req.body.pageY,
      })
      console.log('enter')
      return {
        note
      }
    })()
      .then((r) => {
        res.json({
          code: 0,
          notes: r.note,
        });
      })
      .catch((e) => {
        next(e);
      });
  })

module.exports = router;
