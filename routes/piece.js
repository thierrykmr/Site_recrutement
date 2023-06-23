var express = require('express');
var router = express.Router();
var model = require('../model/piece.js')
const piece = require('../model/piece.js');
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/


router.get('/', function(req, res, next) {
  res.render('piece', { title: 'Les pieces' });
  next();
});

/* GET pieces listing. */

router.get('/piecelist', function (req, res, next) {
  result=pieceModel.readall(function(result){
  res.render('piecelist', { title: 'List des pieces', piece:
  result });
  });
});

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.post('/piece', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
  const pieceLieu = req.body.Lieu;


  //utiliser le model pour enregistrer les données récupérées dans la BD
model.createPiece(null,pieceLieu);//regarder avec le prof le null du callback


});

module.exports = router;
