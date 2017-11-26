import { arch } from 'os';

const Toast = require('./toast').Toast
const Note = require('./note').creatNote
const Event = require('./event')


const NoteManger = (() => {
  function load() {
    $.get('./note')
      .done((result) => {
        if (result.code === 0) {
          $.each(result.notes, function (index, article) {
            new Note({
              id: article._id,
              content: article.content
            })
          })
          Event.trigger('waterfall')
        } else {
          Toast(result.errorMsg)
        }
      })
      .fail(() => {
        Toast('网路异常')
      })
  }
  function add() {
    new Note()
  }

  return {
    load: load,
    add: add
  }
})()

module.exports.NoteManger = NoteManger