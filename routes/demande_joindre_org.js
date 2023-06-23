var express = require('express');
var router = express.Router();
var model = require("../model/demande_joindre_org.js");

/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/


/* GET demande_joindre_orgs listing. */

/*router.get('/', function(req, res, next) {
  res.render('demande_joindre_org', { title: 'Les demandes de joindre des organisations' });
  next();
});*/

router.get('/demande_joindre_orglist', function (req, res, next) {
  result=model.readall(function(result){
  res.render('demande_joindre_orglist', { title: 'List des demandes de joindre des organisations', demande_joindre_orgs:
  result });
  });
});

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/




router.post('/demande_joindre_org', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
  const demande_joindre_orgSiren = req.body.SIREN;


  //utiliser le model pour enregistrer les données récupérées dans la BD
model.createDemande_joindre_org(demande_joindre_orgSiren,null, date);

});//le cas du call-back



module.exports = router;
