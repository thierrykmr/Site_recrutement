var express = require('express');
var router = express.Router();
var usersModel= require("../model/users");

//var offreModel=require('../model/offre');
const sessionM = require('../session');

/*var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../model/db');


passport.use(new LocalStrategy(function verify(email, pwd, cb) {
  db.get('SELECT * FROM USERS WHERE email = ?', [ email ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect email or password.' }); }

    crypto.pbkdf2(pwd, row.salt, 310000, 32, 'sha256', function(err, hashedPwd) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_pwd, hashedPwd)) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, row);
    });
  });
}));




router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));



passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, nom: user.nom });
  });
});


passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

*/






//creation de compte de users
router.post('/signup', function (req, res, next) {
  console.log("traitement post signup");
  //récupérer les données passées via le body de la requête post :
  const userNom = req.body.nom;
  const userPrenom = req.body.prenom;
  const userEmail = req.body.email;  
  const userTel = req.body.telephone; 
  const userPassword = req.body.pwd;
  const userType ="candidat";
  console.log(userNom);
  console.log(userPassword);
    

  //utiliser le model pour enregistrer les données récupérées dans la BD
  usersModel.createUser(userEmail,userTel,userPassword, userNom, userPrenom, userType, function(result) {
    console.log(result);

  });
  //redirection à la page d'accueil originelle
  res.redirect('/signin'); 
  
});


/*

router.post('/signin', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.pwd;
  console.log("le mot de passe dans index",password);


  // Vérification des informations de connexion
  usersModel.areValid(email,password, function(result){
    console.log("test de l'index ok");
    if(result!==false){// utlisateur valide
      sessionM.creatSession(req.session,email,result);
      console.log(`Session créée avec le role :  ${result}`);
      res.redirect('/users/candidat');

      /*if (type==='recruteur'){
        res.redirect('/users/recruteur');}
      if (type==='candidat'){
      res.redirect('/users/candidat');}
      if (type==='admin'){
        res.redirect('/users/admin');}*/

 /*   }
    else{
      //res.redirect('/users/candidat');
      res.send('Identifiants invalides');
 

    }

  });

});

*/



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'WORK & JOB' });
  
});
/*router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Express' });
  
});*/



//un users qui accede à la page connexion
router.get('/signin', function (req, res, next) {
  res.render('signin');
  

});






//un user qui accede à la page candidat quittant de la home page
router.get('/candidat', function (req, res, next) {
  res.render('pageCandidat');

});


//un user qui accede à la page candidat quittant de la home page
router.get('/admin', function (req, res, next) {
  res.render('pageAdmin');
  
});  


//un user qui accede à la page recruteur quittant de la home page
router.get('/recruteur', function (req, res, next) {
  res.render('pageRecruteur');
  
});


//un user qui accede à la page de creation de compte 
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Page_signup' });
  

});



 
// pour se logger
/*router.post('/signin', function (req, res, next) {
    result = usersModel.areValid(function (result) {
      res.render('/')
      
    });
  });

router.post('/signin',function(req, res,next){
  let email=req.body.email;
  let pwd =req.body.pwd;

  result =usersModel.areValid(email, pwd, function(valid){
    console.log(email+pwd);
    if (valid){
      console.log('valide');
      db.creatSession(session,email,)



    }
    else console.log('non valide');
  });
  res.redirect('/');
});
*/









//rayan :bon
router.post('/signin', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.pwd;
  let session = req.session;
   console.log("le mot de passe dans index",password);

  // Vérifier les informations d'identification de l'utilisateur
  usersModel.areValid(email, password, function (result) {
    if (result) {
      // Les informations d'identification sont valides
      console.log("les valeurs de result:", result);//afficher les valeurs de result
      usersModel.getUserRole(email, function (role) {
        console.log(role);
        session = sessionM.creatSession(session, email, role); // Créer la session avec le rôle de l'utilisateur

        // Rediriger vers la page appropriée en fonction du rôle
        if (role === 'admin') {
          res.redirect('/users/admin')
        } else if (role === 'recruteur') {
          res.redirect('/users/recruteur')
        }else if (role === 'candidat') {
          res.redirect('/users/candidat')
        }
         /*else {
          usersModel.readlink(email, function (results) {
            results.forEach((result) => {
              const offerid = result.id_offre;
              const link = result.link;
              if (!req.session.uploaded_files[offerid]) {
                req.session.uploaded_files[offerid] = [];
              }
              req.session.uploaded_files[offerid].push(link);
            });
          });

          offreModel.readHome(function (result) {
            usersModel.read(session.userid, function (result1) {
              res.render('candidat', {
                title: 'pageCandidat',
                users: result,
                list: result1,
                sess: session
              });
            });
          });
        }*/
     });
    } else {
      // Les informations d'identification sont invalides, rendre la page de connexion avec un message d'erreur
      res.render('signin', {
        title: 'signin',
        //error: 'Identifiants invalides'
      });
    }
  });
});




// rayan
/*

var express = require('express');
var router = express.Router();
var userModel = require("../model/utilisateur.js");
var offreModel = require("../model/offre.js");
var sessionM = require('../session');


// Page de connexion
router.get('/', function (req, res, next) {
  res.render('login_page', {
    title: 'Login Page',
    error: ''
  });
});

// router.post('/login_page', function (req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;
//   let session = req.session;

//   // Vérifier les informations d'identification de l'utilisateur
//   userModel.areValid(email, password, function (result) {
//     if (result) {
//       // Les informations d'identification sont valides, rediriger vers la page d'accueil de l'utilisateur
//       console.log('Init connected user');
//       session = sessionM.creatSession(session, email, "users");
//       offreModel.readHome(function (result) {
//         userModel.read(session.userid,function (result1) {
//           res.render('Accueil_utilisateur', {
//             title: 'Accueil_utilisateur',
//             users: result,
//             list: result1,
//             sess: session
//           })
//         });
//       });
//     } else {
//       // Les informations d'identification sont invalides, rendre la page de connexion avec un message d'erreur
//       res.render('Login_page', {
//         title: 'Login Page',
//         error: 'Identifiants invalides',
//       });
//     }
//   });
// });



// Traitement du formulaire de connexion
// router.post('/users/Accueil_utilisateur', function (req, res, next) {
//   res.render('/users/Accueil_utilisateur', {
//     sessions: session,
//     users: result
//   });
// });

router.post('/', function (req, res) {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const motDePasse = req.body.mot_de_passe;
  const telephone = req.body.telephone;
  const verif = req.body.mot_de_passe_verif;

  userModel.read(email, function (result) {
    if (result.length > 0) {
      res.render('Registration_page', {
        title: 'error',
        error: 'L\'email existe déjà'
      });
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
      if (!passwordRegex.test(motDePasse)) {
        res.render('Registration_page', {
          title: 'error',
          error: 'Le mot de passe ne respecte pas les critères de complexité'
        });
      } else if (verif != motDePasse) {
        res.render('Registration_page', {
          title: 'error',
          error: 'Les mot de passe ne sont pas équivalents'
        });
      } else {
        userModel.creat(nom, prenom, email, motDePasse, telephone, function (err) {
          userModel.assignCandidatRole(email, function (err) {

            res.redirect('/');

          });
        });
      }
    }
  });
});

router.get('/Registration_page', function (req, res, next) {
  res.render('Registration_page', {
    title: 'Registration Page',
    error: ''
  });
});

router.get('/disconnect', function (req, res, next) {
  req.session = sessionM.deleteSession(req.session);
  res.redirect("/");
});

*/


router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
  });
  















module.exports = router;


//vs injections
//sesions
//violations controle d'acces
