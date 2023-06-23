var express = require('express');
var router = express.Router();
var offreModel= require("../model/offre.js");
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/


/*router.get('/', function(req, res, next) {
  res.render('offre', { title: 'Les offres' });
  next();
});
*/




// GET offres listing en quittant de offre

router.get('/offrelist', function (req, res, next) {
  result=offreModel.readall(function(result){
  res.render('offrelist', { title: 'List des offres', offres:
  result });
  });
});
 






module.exports = router;
