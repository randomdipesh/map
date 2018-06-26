const express = require('express')
const app = express()
app.set('view engine','ejs')
const bparser = require('body-parser')
app.use(bparser.urlencoded({extended : true}))
var port = process.env.PORT || 3000
app.use(express.static('public'))
var googleMapsClient = require('@google/maps').createClient({
  key : 'AIzaSyAoL1Fgtb927ssXYFf7NGGKScPyVmTMHyg',
});
app.get('/',(req,res)=>{
	res.render('index')
})
app.post('/',(req,res)=>{
	var location = req.body.location
	var dest = 'Denver International Airport'
	var time = req.body.time
	var type = req.body.type
	var tt = new Date(time).getTime()
	console.log(tt)
		if(type == "driving"){
				googleMapsClient.directions({
		  origin: location,
		  destination : dest,
		  mode : type,
		  departure_time : tt,

		  }, function(err, response) {
		  if (!err) {
		  	console.log(response)
		    res.send({data : response.json,type,location,destination : dest})
		  }
		  else{
		  	console.log(err)
		  	res.send(err)
		  }
		});
		}
		else{
			googleMapsClient.directions({
		  origin: location,
		  destination : dest,
		  mode : type,
		  // departure_time : tt,

		  }, function(err, response) {
		  if (!err) {
		  	console.log(response)
		    res.send({data : response.json,type,location,destination : dest})
		  }
		  else{
		  	console.log(err)
		  	res.send(err)
		  }
		});
		}

})
app.listen(port,(err)=>{
	if(err){console.log("ERROR WHILE STARTING SERVER :: ",err)}
	else{
		console.log("Up and running at port ",port)
	}
})