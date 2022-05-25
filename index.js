var express = require('express');

//Init app
var app = express();
const mongoose = require('mongoose');


const userRoute = require('./routes/userRoutes');

/*var MONGO_DB_USER='omarrizwan'
var MONGO_DB_PASSWORD='reaang12'
var MONGO_DB_DATABASE='mine'*/

app.use(express.json())

/*app.get('/',function(req,res)
{
res.send('working');
});*/


const url = `mongodb+srv://${'omarrizwan'}:${'reaang12'}@cluster0.asgxn.mongodb.net/${'my_own_interview_one'}?retryWrites=true&w=majority`;
var db = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
	if(!err)
	{
		console.log("mongoose connectionjjj succedeed");
	}
else
{
console.log("error in DB connection"+err);
}
});



app.use('/',userRoute);

//Start the server
var port =5000;

app.listen(port,function(){
	console.log('server start on port' + port);
});