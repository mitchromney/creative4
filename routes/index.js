var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

router.get('/get',function(req,res,next) {
    
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        console.log(myRe);
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe); 
            if(result != -1) {
                console.log(cities[i]);
                jsonresult.push({city:cities[i]});
            } 
        }   
        res.status(200).json(jsonresult);
    });
});

module.exports = router;
