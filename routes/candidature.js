var express = require('express');
var router = express.Router();
var candidatureModel=require ("../model/candidature.js");
var model=require("../model/candidature.js");
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/

/*router.get('/', function(req, res, next) {
  res.render('Candidature', { title: 'Les candidatures' });
  next();
});
*/

/* GET candidature listing. */

router.get('/candidaturelist', function (req, res, next) {
  result=candidatureModel.readall(function(result){
  res.render('condidaturelist', { title: 'List des candidatures', candidatures:
  result });
  });
});

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/




router.post('/candidature', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :



  //utiliser le model pour enregistrer les données récupérées dans la BD
  candidatureModel.create(null,date,null);

});//le cas du call-back

module.exports = router;
