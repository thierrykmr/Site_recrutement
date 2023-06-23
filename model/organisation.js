var db = require('./db.js');
module.exports = {
  read: function (siren, callback) {


    db.query("select * from ORGANISATION where siren= ?", siren, function
      (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  readall: function (callback) {
    db.query("select * from ORGANISATION", function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  /*areValid: function (siren, password, callback) {
      sql = "SELECT pwd FROM OrganisationS WHERE siren = ?";
      rows = db.query(sql, siren, function (err, results) {
          if (err) throw err;
          if (rows.length == 1 && rows[0].pwd === password) {
              callback(true)
          } else {
              callback(false);
          }
      });
  },*/



  // Fonction de création d'un organisation
  createOrganisation: function (siren, nom, siege_social, type, statut, callback) {
    var query = 'INSERT INTO ORGANISATION (siren, nom, siege_social, type, statut) VALUES (?, ?, ?, ?, ?)';
    var values = [siren, nom, siege_social, type, statut];

    db.query(query, values, (err, results) => {
      if (err) throw err;
      
      callback( results);
      
    });
  },

  // Fonction de lecture d'un organisation par siren
 /* getOrganisation: function (siren, callback) {
    var query = 'SELECT * FROM organisation WHERE siren = ?';
    var values = [siren];

    db.query(query, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0]);
      }
    });
  },
  */

  // Fonction de mise à jour d'un organisation
  updateOrganisation: function (siren, newNom, newSiege_social, newType, newStatut, callback) {
    var query = 'UPDATE ORGANISATION SET ? WHERE siren = ?';

    db.query(query, [newNom, newSiege_social, newType, newStatut, siren], (err, results) => {
      if (err) throw err
      callback(results);
      
    });
  },

  // Fonction de suppression d'un organisation par siren
  delete: function (siren, callback) {
    var query = 'DELETE FROM ORGANISATION WHERE siren = ?';
    var values = [siren];

    db.query(query, values, (err, results) => {
      if (err) throw err;
      callback(results);
      
    });
  }



  
}; 




