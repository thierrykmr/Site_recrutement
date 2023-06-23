var express = require('express');
var router = express.Router();
var model = require("../model/organisation.js");
var organisationModel= require("../model/organisation.js");
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/

router.get('/', function(req, res, next) {
  res.render('organisation', { title: 'Les organisations' });
  next();
});
/* GET organisations listing. */

router.get('/organisationslist', function (req, res, next) {
  result=organisationModel.readall(function(result){
  res.render('organisationsList', { title: 'List des organisations', organisations:
  result });
  });
});

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/



module.exports = router;
