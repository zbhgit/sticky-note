const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/stick-note'

mongoose.connect(uri, { useMongoClient: true })
// connect
mongoose.connect(uri, { useMongoClient: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
// 检测是否连接成功
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected');
});

