var app = require('express').createServer(),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
    priority = ['low', 'normal', 'high', 'critical'],
    logtype = ['information', 'warning' ,'error'];

mongoose.connect('mongodb://localhost/logs');

logItem = new Schema({
   priority  : Number,
   logtype   : Number,
   datetime  : Date,
   msg       : String
});

mongoose.model('logItem', logItem);

app.get('/', function(req, res){
  res.send("Log saved on " + Date());
  console.log("Log saved on " + Date());  

  var reqQuery = req.query;
  var logItem = mongoose.model('logItem');

  var pr = priority.indexOf(reqQuery["priority"])
  var type = logtype.indexOf(reqQuery["type"]);

  new logItem({datetime: Date(), priority: (pr >= 0 ? pr : 0), logtype: (type >= 0 ? type : 0), msg: reqQuery["msg"]}).save();
});

app.listen(3000);
