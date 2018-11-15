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
let VoteModel = mongoose.model('VoteModel', VoteSchema)
// let vote = new VoteModel({
//   _id: 1, name: 'bTeam', count: 10
// })
// vote.save(function(err) {
//   if(err) console.log(err);
//   console.log('saved!');
// })

let router = express.Router();
router.get('/vote', function(req, res){
  VoteModel.find({}, function(err, list){
    if(err){
      res.json({code: 'STH WRONG1'}
    )}
    res.json({code: 'SUCCESS', data: list})
  })
})
router.put('/vote/:id/add',function(req, res){
  VoteModel.findById(req.params.id, function(err,vote){
    vote.count++;
    vote.save(function(err) {
      if(err) console.log(err);
      console.log('saved!');
    })
    res.json({code:'SUCCESS', data: true})
  })
})

app.use('/', router)
 
let server = app.listen(8081)
console.log('服务器开启成功');