
require('less/index.less');
const toast = require('../module/toast')
const note = require('../module/note')
$('.add-note').on('click', () => {
  note.creatNote({
    id: '10',
    context: 'Hello World'
  })
})
