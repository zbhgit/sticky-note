
require('less/index.less');
const NoteManger = require('module/note_manger').NoteManger
const Event = require('module/event')
const WaterFall = require('module/waterfall')
NoteManger.load();

$('.add-note').on('click', function() {
  NoteManger.add();
})

Event.on('waterfall', function(){
  WaterFall.init($('#content'));
})