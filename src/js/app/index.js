
require('less/index.less');
const toast = require('../module/toast')
$('.add-note').on('click', () => {
  toast.Toast("hello", 2000)
})
