var express = require('express');
var router = express.Router();
var model = require("../model/fiche_poste.js");
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/


/* GET fiche_postes listing. */

/*router.get('/', function(req, res, next) {
  res.render('fiche_poste', { title: 'Les fiches de poste' });
  next();
});*/


router.get('/fiche_postelist', function (req, res, next) {
  result=model.readall(function(result){
  res.render('fiche_postelist', { title: 'List des fiches de postes', fiche_postes:
  result });
  });
});

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.post('/fiche_poste/id_offre', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
  const fiche_posteId_offre= req.params.id_offre;
  const fiche_posteIntitule = req.body.intitule;
  const fiche_posteStatut = req.body.statut;
  const fiche_posteResponsabilite = req.body.responsabilte;
  const fiche_posteLieu= req.body.lieu;
  const fiche_posteType_metier= req.body.type_metier;
  const fiche_posteRythme= req.body.type_rythme;
  const fiche_posteFourchette_salaire= req.body.fourchette_salaire;
  const fiche_posteDescription =req.body.description;

  //utiliser le model pour enregistrer les données récupérées dans la BD
model.createFiche_poste(fiche_posteId_offre, fiche_posteIntitule,fiche_posteStatut,fiche_posteResponsabilite,fiche_posteLieu
  ,fiche_posteType_metier,fiche_posteRythme,fiche_posteFourchette_salaire,fiche_posteDescription,null);

});//le cas du call-back

module.exports = router;
