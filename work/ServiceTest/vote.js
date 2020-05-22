let express = require('express');
let cors = require('cors')

var mongoose = require("mongoose");
var mongoDB = 'mongodb://yz:yz12346@ds037778.mlab.com:37778/locoal_data';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let app = express();
app.use(cors())

let Schema = mongoose.Schema;

let VoteSchema = new Schema({
  name:String,
  _id:Number,
  count: Number,
});

let VoteModel = mongoose.model('Vote', VoteSchema)
let vote = new VoteModel({
  _id: 1, name: 'bTeam', count: 10
})
// vote.save(function(err) {
//   if(err) console.log(err);
//   console.log('saved!');
// })
let RecordSchema = new Schema({
  voteId: Number,
  ip: String,
  date: Date,
})

let RecordModel = mongoose.model('Record', RecordSchema)

let router = express.Router();
router.get('/vote', async(req,res)=>{
  let list = await VoteModel.find({}, 'name count').exec()
  res.json({code: 'SUCCESS', data: list})
})
router.put('/vote/:id/add', async(req,res)=>{
  
  var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
  let newDate = new Date()
  let countRecord = await RecordModel.countDocuments({ip: ip , date: {$gt: new Date()-24*60*60*1000 }}).exec()
  if(countRecord){
    res.json({code: 'FAIL'})
    return
  }
  let record = new RecordModel({
    voteId: req.params.id,
    ip: ip,
    date: newDate,
  })
  await record.save()
  let vote = await VoteModel.findById(req.params.id).exec()
  vote.count++;
  await vote.save()
  res.json({code:'SUCCESS', data: true})
})
app.use('/', router)
 
let server = app.listen(8081)
console.log('服务器开启成功');