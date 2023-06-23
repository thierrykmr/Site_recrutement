var db = require('./db.js');
module.exports = {
  read: function (email, callback) {


    db.query("SELECT * from USERS where email=?", email, function
      (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  readCompte: function (email, callback) {

    
    db.query("SELECT * from USERS where email='thierrychemanack@yahoo.com'", email, function
      (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  readall: function (callback) {
    db.query("SELECT * from USERS", function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  /*areValid: function (email, password, callback) {
    sql = "SELECT pwd FROM USERS WHERE email = ?";
    rows = db.query(sql, email, function (err, results) {
      if (err) throw err;
      if (rows.length == 1 && rows[0].pwd === password) {
        callback(true)
      } else {
        callback(false);
      }
    });
  },
  
*/
  areValid: function (email, password, callback) {
    sql = "SELECT pwd, type FROM USERS WHERE email = ?";

    db.query(sql, email, function (err, results) {
        if (err) throw err;
        console.log(results); // Vérifier les résultats de la requête
        //console.log(pwd);
        console.log(email);
        console.log(password);
        console.log(`Le mail est ${email}`);
        //console.log(`Le mot de passe 1 est ${pwd}`);
        console.log(`Le mot de passe 2 est ${password}`);
        if (results.length == 1 && results[0].pwd === password) {
            console.log('Mot de passe correct:', results[0].pwd); // Vérifier la valeur du mot de passe stocké
            callback(results[0].type);
        } else {
            console.log('Mot de passe incorrect');
            callback(false);
        }
        if(results !==false){
            console.log("le result est vrai");
        }
        else{
            console.log("le result est faux");
        }
    });
},






  // Fonction de création d'un utilisateur
  createUser: function (email, telephone, pwd, nom, prenom, callback) {
    var query = "INSERT INTO USERS (email, telephone, nom, prenom, pwd) VALUES (?, ?, ?, ?, ?)";
    /*var values = [email, telephone, nom, prenom,pwd];*/
    
    db.query(query,[email, telephone, nom, prenom,pwd] , function (err, result) {
      if (err) throw err;
    console.log("insert ok pour user nom:",nom);
    console.log("insert ok pour user password:",pwd);
    console.log("insert ok pour user email:", email);
      callback(result);

    });
  },

  // Fonction de création d'un utilisateur
  /*createUser: function (email, telephone, pwd, nom, prenom, callback) {
    var query = "INSERT INTO USERS (email, telephone, nom, prenom, pwd) VALUES (?, ?, ?, ?, ?)";*/
    /*var values = [email, telephone, nom, prenom,pwd];*/
    
    /*db.query(query,[email, telephone, nom, prenom,pwd] , function (err, result) {
      if (err) throw err;
    console.log("insert ok pour user",nom);
      callback(result);

    });
  },*/
 

  // Fonction de lecture d'un utilisateur par email
  /*getUser:function(email, callback) {//pareil que  la fonction read
    var query = 'SELECT * FROM Utilisateur WHERE email = ?';
    var values = [email];
  
    db.query(query, values, (error, result) => {
      if (error) {
        throw err;
      } else {
        callback(null, result[0]);
      }
    });
  },*/
  

  // Fonction de mise à jour d'un utilisateur
  update: function (email, newTelephone, newPwd, newNom, newPrenom,/* newType, */callback) {
    var query = 'UPDATE USERS SET ? WHERE email = ?';

    db.query(query, [newTelephone, newPwd, newNom, newPrenom,/* newType,*/ email], (err, result) => {
      if (err) throw err;
      callback(result.affectedRows);
      
    });
  },

  // Fonction de suppression d'un utilisateur par email
  deleteUser: function (email, callback) {
    var query = 'DELETE FROM USERS WHERE email = ?';
    var values = [email];

    db.query(query, values, (err, result) => {
      if (err) throw err;
      
      callback(result.affectedRows);
      
    });
  },


  delete : function (email, callback){
    let sql = "delete from USERS where email = ?";
    db.query(sql,email,function(err, result){
        if (err) throw err;
        callback (result);
    });
  },


  getUserRole: function (email, callback) {
    var sql = `
    SELECT type AS role FROM USERS U WHERE U.email = ?`;
          db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (results.length === 1) {
              callback(results[0].role);
            } else {
              callback(null);
            }
          });
        },


  readtypebyemail: function (email, callback) {
     db.query("select type from USERS where email= ?", email, function
      (err, results) {
       if (err) throw err;
        callback(results);
          });
  },


  /*updateType :function (id, nouveauType, callback) {
    const sql = 'UPDATE USERS SET type = ? WHERE id = ?';
    const values = [nouveauType, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du type de l\'utilisateur :', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },*/




  


// Méthode pour mettre à jour le type d'utilisateur
updateType: function (id, newType, callback) {
  const sql = 'UPDATE USERS SET type = ? WHERE id = ?';
  const values = [newType, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du type d\'utilisateur :', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
},























}; 


