
require('less/note.less')

const createToast = require('./toast')
const Event = require('module/event.js')

class Note {
  constructor(options) {
    this.initOptions(options)
    this.createNote()
    this.setStyle()
    this.setLayout()
    this.bindEvent()
  }
  initOptions(options) {
    this.initOptions = Object.assign({}, Note.defaultOptions, options || {})
    if (this.initOptions.id) {
      this.id = this.initOptions.id
    }
  }
  createNote() {
    const tpl = `<div class="note" style="display:none">
    <div class="note-head"><span class="delete">&times;</span></div>
    <div class="note-ct" contenteditable="true"></div>
    </div>`
    this.$note = $(tpl)
    this.$note.find('.note-ct').html(this.initOptions.content);
    this.initOptions.$ct.append(this.$note)
    this.$note.fadeIn(300)
    if (!this.id) {
      this.$note.css('bottom', '10px')
    }
  }
  // 设置背景颜色
  setStyle() {
    const color = Note.colors[Math.floor(Math.random() * 6)]
    this.$note.find('.note-head').css('background-color', color[0])
    this.$note.find('.note-ct').css('background-color', color[1])
  }
  // 设置位置
  setLayout() {
    if (this.clock) {
      clearTimeout(this.clock)
    }
    this.clock = setTimeout(() => {
      Event.trigger('waterfall')
    }, 100)
  }
  // 绑定事件
  bindEvent() {
    const self = this
    const $note = this.$note
    const $noteHead = $note.find('.note-head')
    const $noteCt = $note.find('.note-ct')
    const $delete = $note.find('.delete')
    $delete.on('click', () => {
      this.delete()
    })
    $noteCt.on('focus', () => {
      if ($noteCt.html() === 'input here') { $noteCt.html('') }
      $noteCt.data('before', $noteCt.html())
    }).on('blur paste', () => {
      if ($noteCt.data('before') != $noteCt.html()) {
        $noteCt.data('before', $noteCt.html());
        self.setLayout();
        if (self.id) {
          self.edit($noteCt.html())
        } else {
          const param = {
            noteId: 2,
            content: $noteCt.html()
          }
          self.addNote(param)
        }
      }
      // let beforeHtml = $noteCt.data('before')
      // if (beforeHtml === $noteCt.html()) {
      //   return
      // }
      // self.setLayout();
      // if ($noteCt.html() !== '') {
      //   const param = {
      //     noteId: 2,
      //     content: $noteCt.html()
      //   }
      //   self.addNote(param)
      // }
    })
    // 设置笔记的移动
    $noteHead.on('mousedown', function (e) {
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
        evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', { x: evtX, y: evtY }); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function () {
      $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function (e) {
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX - $('.draggable').data('evtPos').x
      });
    });
  }
  // 删除节点
  delete() {
    this.$note.fadeOut(300, () => {
      createToast.Toast('删除成功')

      this.$note.remove()
      Event.trigger('waterfall')
    })
  }
  // 添加内容到服务器
  addNote(param) {
    const self = this
    const { noteId, content } = param
    $.post('/note', { noteId, content })
      .done((result) => {
        if (result.code === 0) {
          createToast.Toast('添加成功')
        } else {
          self.$note.remove()
          Event.trigger('watterfall')
          createToast.Toast('添加失败')
        }
      })
  }

}


//  定义默认参数内容
Note.defaultOptions = {
  id: '',
  $ct: $('#content').length > 0 ? $('#content') : $('body'),
  context: 'input here'
}
Note.colors = [
  ['#ea9b35', '#efb04e'], // headColor, containerColor
  ['#dd598b', '#e672a2'],
  ['#eee34b', '#f2eb67'],
  ['#c24226', '#d15a39'],
  ['#c1c341', '#d0d25c'],
  ['#3f78c3', '#5591d2']
]

module.exports.creatNote = (options) => {
  return new Note(options)
}