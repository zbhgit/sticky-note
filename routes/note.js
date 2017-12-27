var express = require('express');
var router = express.Router();
const Note = require('../model/note')
/* GET users listing. */
router.route('/')
  .get((req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.send({ code: 1, errorMsg: '请先登录' })
    }
    (async () => {

      let notes = await Note.getNotes(req.session.user.id);
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
    if (!req.session || !req.session.user) {
      return res.send({ code: 1, errorMsg: '请先登录' })
    }
    (async () => {
      const note = await Note.addNewNote({
        userId: req.session.user.id,
        content: req.body.content,
        pageX: req.body.pageX,
        pageY: req.body.pageY,
      })
      return {
        note
      }
    })()
      .then((r) => {
        console.log(r)
        res.json({
          code: 0,
          notes: r.note,
        });
      })
      .catch((e) => {
        next(e);
      });
  })
router.route('/:id')
  .put((req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.send({ code: 1, errorMsg: '请先登录' })
    }
    (async () => {
      let update = {}
      if (req.body.content) {
        update.content = req.body.content;
      }
      const note = await Note.updateNoteById(req.params.id, update)
      return {
        code: 0,
        note
      }
    })()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  })
  .delete((req, res, next) => {
    console.log(req.session)
    console.log(req.session.user)
    if (!req.session || !req.session.user) {
      return res.send({ code: 1, errorMsg: '请先登录' })
    } else {
      (async () => {
        if (!req.params.id) {
          return {
            code: 1,
            message: '未设定需删除的note ID'
          }
        }
        const result = await Note.removeANote({ id: req.params.id })
        return {
          code: 0,
          result,
        }
      })()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          next(err);
        });
    }

  })
module.exports = router;
