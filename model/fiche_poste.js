var db = require('./db.js');

module.exports = {
    
    read: function (numero, callback) {


        db.query("select * from FICHE_POSTE WHERE numero= ?", numero, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from FICHE_POSTE", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    /*areValid: function (numero, password, callback) {
        sql = "SELECT rythme FROM USERS WHERE numero = ?";
        rows = db.query(sql, numero, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].rythme === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },*/
 


// Fonction de création d'un fiche_poste
createFiche_poste:function(/*numero, */intitule, statut, responsabilite, lieu,type_metier, rythme, fourchette_salaire, description,id_offre, callback) {
  
  var query = 'INSERT INTO FICHE_POSTE ( intitule, statut, responsabilite, lieu, type_metier, rythme, fourchette_salaire, description, id_offre) VALUES (  ?, ?, ?, ?, ?, ?,?, ?, ?)';
  var values = [ intitule, statut, responsabilite, lieu,type_metier, rythme, fourchette_salaire, description, id_offre];

  db.query(query, values, (err, result) => {
    if (err) throw err;
      callback(result);
    
  });
},

// Fonction de lecture d'un fiche_poste par numero
 /*getFiche_poste:function(numero, callback) {
  var query = 'SELECT * FROM fiche_poste WHERE numero = ?';
  var values = [numero];

  db.query(query, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result[0]);
    }
  });
},*/

// Fonction de mise à jour d'un fiche_poste
 updateFiche_poste:function(numero,  newIntitule, newStatut, newResponsabilite, newLieu,newType_metier,newRythme, newFourchette_salaire, newDescription, callback) {
  var query = 'UPDATE FICHE_POSTE SET ? WHERE numero = ?';

  db.query(query, [newIntitule, newStatut, newResponsabilite, newLieu,newType_metier,newRythme, newFourchette_salaire, newDescription, numero], (err, result) => {
    if (err) throw err;
    
      callback(result);
    
  });
},

// Fonction de suppression d'un fiche_poste par numero
deleteFiche_poste:function(numero, callback) {
  var query = 'DELETE FROM FICHE_POSTE WHERE numero = ?';
  var values = [numero];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    callback(result);
    
  });
}


        
     
}
