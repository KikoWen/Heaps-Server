var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var Harvest = require('./harvest-model');

//setup database connection
var connectionString = 'mongodb://heaps:heaps12345@cluster0-shard-00-00-tffee.mongodb.net:27017,cluster0-shard-00-01-tffee.mongodb.net:27017,cluster0-shard-00-02-tffee.mongodb.net:27017/heaps?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));

//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));

//setup routes
var router = express.Router();

router.get('/testing', (req, res) => {
    res.send('<h1>Testing is working</h1>')
  })

router.get('/harvests', (req, res) => {
   Harvest.find()
    .then((harvests)=>{
        return res.json(harvests);
    });
})
router.get('/harvests/:id', (req, res) => {

	Harvest.findOne({id:req.params.id})
	.then((harvest) => {
	    return res.json(harvest);
	});
})

router.post('/harvests', (req, res) => {

	var harvest = new  Harvest();
	harvest.id = Date.now();
	
	var data = req.body; //get the data out
	Object.assign(harvest,data);  // same as var newItem ={...item, ...extra}, but this is mongoose 
	
	harvest.save()
	.then((harvest) => {
	  	return res.json(harvest);
	});
});

router.delete('/harvests/:id', (req, res) => {

	Harvest.deleteOne({ id: req.params.id })
	.then(() => {
		return res.json('deleted');
	});
});

router.put('/harvests/:id', (req, res) => {

  Harvest.findOne({id:req.params.id})
	.then((harvest) => {
		var data = req.body;
		Object.assign(harvest,data);
		return harvest.save()	  
	})
	.then((harvest) => {
		return res.json(harvest);
	});	

});




app.use('/api', router);


// launch our backend into a port
const apiPort = 4001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
