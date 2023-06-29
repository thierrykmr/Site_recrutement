var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js');
var orgModel = require('../model/organisation.js');
var offreModel= require('../model/offre.js');
var fiche_posteModel= require('../model/fiche_poste.js');
var candidatureModel= require('../model/candidature.js');
var pieceModel=require('../model/piece.js');
var fiche_posteModel=require('../model/fiche_poste.js');
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/




  //ajout d'une organisation
  router.post('/ajoutOrg', function (req, res, next) {
    //récupérer les données passées via le body de la requête post :
   
     const orgSiren = req.body.siren;
     const orgNom = req.body.nom_org; 
     const orgSiege = req.body.siege_social; 
     const orgType = req.body.type_org;
     const orgStatut = req.body.statut; 
   
    
    //utiliser le model pour enregistrer les données récupérées dans la BD
    orgModel.createOrganisation(orgSiren,orgNom,orgSiege,orgType,orgStatut, function(result) {
        return result;
    
      });
    res.redirect('/users/recruteur'); 
      
    });






//Ajout d'une offre par un recruteur

router.post('/ajoutOffre', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
 
   const offreCreateur = req.body.createur;
   const offreIndication = req.body.indication; 
   const offreDate_validite = req.body.date_validite;
/*
  const fiche_posteIntitule = req.body.intitule;
  const fiche_posteStatut = req.body.statut;
  const fiche_posteResponsabilite = req.body.responsabilite;
  const fiche_posteLieu= req.body.lieu;
  const fiche_posteType_metier= req.body.type_metier;
  const fiche_posteRythme= req.body.rythme;
  const fiche_posteFourchette_salaire= req.body.fourchette_salaire;
  const fiche_posteDescription =req.body.description;
  const fiche_posteNumero =req.body.numero;
  */

   
 

  //utiliser le model pour enregistrer les données récupérées dans la BD
  offreModel.createOffre(offreDate_validite,offreIndication,offreCreateur, function(result){
    res.redirect('/users/ajoutFiche_poste/'+result.insertId);

  });
  

  /*fiche_posteModel.createFiche_poste(fiche_posteNumero, fiche_posteIntitule,fiche_posteStatut,fiche_posteResponsabilite,fiche_posteLieu
    ,fiche_posteType_metier,fiche_posteRythme,fiche_posteFourchette_salaire,fiche_posteDescription, function(result){
      return result;
    });
*/
  
});
router.post('/ajoutFiche_poste', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
  
  const fiche_posteIntitule = req.body.intitule;
  const fiche_posteStatut = req.body.statut;
  const fiche_posteResponsabilite = req.body.responsabilite;
  const fiche_posteLieu= req.body.lieu;
  const fiche_posteType_metier= req.body.type_metier;
  const fiche_posteRythme= req.body.rythme;
  const fiche_posteFourchette_salaire= req.body.fourchette_salaire;
  const fiche_posteDescription =req.body.description;
  //const fiche_posteNumero =req.body.numero;
  const fiche_posteId_offre= req.body.id_offre;


  fiche_posteModel.createFiche_poste(/*fiche_posteNumero, */fiche_posteIntitule,fiche_posteStatut,fiche_posteResponsabilite,fiche_posteLieu
    ,fiche_posteType_metier,fiche_posteRythme,fiche_posteFourchette_salaire,fiche_posteDescription, fiche_posteId_offre,function(result){
      return result;
    });
    res.redirect('/users/recruteur');
    
  });
  





    
    
//pour afficher la liste des organisations à l'utilisateur
router.get('/admin/organisationlist', function (req, res, next) {
  result = orgModel.readall(function (result) {
    res.render('organisationlist', {
      title: 'Liste des organisations', organisation:
        result
    });
  });
  
});

/*router.get('/admin/organisationlist', function(req, res, next) {
  res.render('organisationlist');
  next();
});*/  

/* GET users . */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Les users' });
  
});

//aller à la page admin en quittant de la page users
router.get('/admin', function(req, res, next) {
  res.render('pageAdmin', { title: 'Page_admin' });
  
});

//aller à la page candidat en quittant de la page users
router.get('/candidat', function(req, res, next) {
  res.render('pageCandidat', { title: 'Page_Candidat' });
  
});

//aller à la page recruteur en quittant de la page users
router.get('/recruteur', function(req, res, next) {
  res.render('pageRecruteur', { title: 'Page_Recruteur' });
 
});


//un admin qui voit les differentes organisations
/*router.get('/admin/organisationlist', function(req, res, next) {
  res.render('organisationlist', { title: 'Listes des organisations' });
  next();
});*/

//un recruteur qui ajoute une offre
router.get('/ajoutOrg', function(req, res, next) {
  res.render('ajoutOrg', { title: 'Ajout d\'une nouvelle organisation' });
  
});


//un recruteur qui ajoute une fiche de poste
router.get('/ajoutFiche_poste/:id_offre', function(req, res, next) {
  res.render('ajoutFiche_poste', { title: 'Ajout d\'une fiche de poste', id_offre: req.params.id_offre });
  
});

//pour afficher la liste des utilisateurs à l'admin
router.get('/admin/userslist', function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render('userslist', {
      title: 'Liste des utilisateurs', users:
        result
    });
  });
});


//un recruteur qui ajoute une offre
router.get('/ajoutOffre', function(req, res, next) {
  res.render('ajoutOffre', { title: 'Ajout d\'une nouvelle offre' });
  
});



//qui permet à l'admin de supprimer un user
router.delete("/:id", function(req, res, next){
  userModel.delete(req.params.id, function(result){
    res.json(result);
  })

});

// qui permet au recruteur de supprimer l'offre
router.delete("/offre/:id", function(req, res, next){
  offreModel.delete(req.params.id, function(result){
    res.json(result);
  })

});







//qui permet à l'admin de supprimer une organisation
router.delete("/:siren", function(req, res, next){
  orgModel.delete(req.params.siren, function(result){
    res.json(result);
  })

});


//un candidat qui emet ses documents
router.get('/upload', function(req, res, next) {
  res.render('upload');
  
});



//le candidat qui accede à la liste des offres d'emploi
/*router.get('/candidat/offrelist', function(req, res, next) {
  res.render('offrelist', { title: 'Listes des offres' });
  next();
});*/

//le candidat qui accede a la liste des offres
router.get('/offrelist', function (req, res, next) {
  result = offreModel.readallval(function (result) {
    res.render('offrelist', {
      title: 'Liste des offres', offre:
        result
    });
  });
});

//listes des offrres expirees
router.get('/offresEx', function (req, res, next) {
  result = offreModel.readallex(function (result) {
    res.render('offresEx', {
      title: 'Liste des offres', offre:
        result
    });
  });
});

//le recruteur qui accede à la liste des offres
router.get('/offrelistR', function (req, res, next) {
  result = offreModel.readall(function (result) {
    res.render('offrelistR', {
      title: 'Liste des offres', offre:
        result
    });
  });
});


//le recruteur qui accede à la liste des offres encore valides 
router.get('/offresValides', function (req, res, next) {
  result = offreModel.readallval(function (result) {
    res.render('offresValides', {
      title: 'Liste des offres valides', offre:
        result
    });
  });
});
  


//le admin qui accede à la liste des offres
router.get('/offrelistR', function (req, res, next) {
  result = offreModel.readall(function (result) {
    res.render('offrelistR', {
      title: 'Liste des offres', offre:
        result
    });
  });
});


//le admin qui accede à la liste des offres encore valides 
router.get('/offresValides', function (req, res, next) {
  result = offreModel.readallval(function (result) {
    res.render('offresValides', {
      title: 'Liste des offres valides', offre:
        result
    });
  });
});
  



/*

// quitter de la page useer pour aller dans la page candidat
router.get('/candidat', function(req, res, next) {
  res.render('pageCandidat');
  next();
});



// quitter de la page useer pour aller dans la page recruteur
router.get('/users/recruteur', function(req, res, next) {
  res.render('pageRecruteur');
  next();
});



// quitter de la page useer pour aller dans la page admin
router.get('/admin', function(req, res, next) {
  res.render('PageAdmin');
  next();
});

*/


//un recruteur qui voit la liste des candidatures
/*router.get('/recruteur/candidaturelist', function(req, res, next) {
  res.render('candidaturelist', { title: 'Listes des candidatures' });
  next();
});*/
router.get('/candidaturelist', function (req, res, next) {
  result = candidatureModel.readall(function (result) {
    res.render('candidaturelist', {
      title: 'Liste des candidature', candidature:
        result
    });
  });
});
//le candidat qui accede à la liste des fiches de postes
router.get('/fiche_postelist', function (req, res, next) {
  result = fiche_posteModel.readall(function (result) {
    res.render('fiche_postelist', {
      title: 'Liste des fiche des postes', fiche_poste:
        result
    });
  });
});
/*router.get('/userslist/:type', function (req, res, next) {
  result=userModel.readall(function(result){
  let type = req.params.type;
  res.render('usersList/:type', {
    title: 'Type d\'utilisateur', type:
      result
  });
  });
  });
  */


  

//le recruteur qui accede a la liste des pieces
/*router.get('/recruteur/piecelist', function(req, res, next) {
  res.render('piecelist', { title: 'Listes des pieces' });
  next();
});*/

// le recruteur accede a la liste des pieces
router.get('/piecelist', function (req, res, next) {
  result = pieceModel.readall(function (result) {
    res.render('piecelist', {
      title: 'Liste des fiche des pieces', piece:
        result
    });
  });
});



// acceder à la page pour upload des fichiers
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'mon compte' });
  
});

//modifier une offre
router.get('/modifierOffre', function(req, res, next) {
  res.render('modifierOffre');
  
});




//un user qui accede à son compte
router.get('/moncompte', function (req, res, next) {
  let email=req.session.email;
  result = userModel.readCompte(email,function (result) {
    res.render('moncompte', {
      title: 'Mon compte', users:
        result
    });
  });
});










//un candidat qui emet ses documents
router.get('/candidature', function(req, res, next) {
  res.render('candidature');
  
});

// candidater
router.get("/candidature/:id", function(req, res, next){
  candidatureModel.create(req.params.id, function(result){
    res.json(result);
  })

});


//un candidat qui ajoute une candidature
router.get('/users/canditaure/:id_offre', function(req, res, next) {
  res.render('candidature', { title: 'Ajout d\'une candidature', id_offre: req.params.id_offre });
  
});


router.post('/users/offrelist', function (req, res, next) {
  //récupérer les données passées via le body de la requête post :
 
   //const offreCreateur = req.body.createur;
   //const offreIndication = req.body.indication; 
   //const offreDate_validite = req.body.date_validite;
   const candidatureId_offre= req.body.id_offre;
   console.log(candidatureId_offre);

  //utiliser le model pour enregistrer les données récupérées dans la BD
  candidatureModel.create(candidatureId_offre,function(result){
    res.redirect('/users/candidature/'+result.insertId);

  });
  
});




// Méthode pour mettre à jour le type d'utilisateur
router.post('/changer-type',function(req,res,next){

  const userId = req.params.id; // Récupérer l'ID de l'utilisateur 
  const newType = req.body.newType; // Récupérer le nouveau type d'utilisateur depuis le corps de la requête
  console.log(userId);
  userModel.updateType(userId, newType,  (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du type d\'utilisateur :', err);
      res.status(500).send('Erreur lors de la mise à jour du type d\'utilisateur');
    } else {
      
      return result;
      
    }
    
  });
  res.redirect('/signin');
});
router.get('/changer-type/:id', function(req, res, next) {
  res.render('changerType', { title: 'Changer le type', id: req.params.id });
  
});


router.get("/candidature/:id", function(req, res, next){
  candidatureModel.create(req.params.id, function(result){
    res.json(result);
  })

});








module.exports = router;
