var db = require('./db.js');

module.exports = {
  read: function (SIREN, callback) {


    db.query("select * from Demande_joindre_org where SIREN= ?", SIREN, function
      (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  readall: function (callback) {
    db.query("select * from Demande_joindre_org", function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  /*areValid: function (SIREN, password, callback) {
      sql = "SELECT pwd FROM USERS WHERE SIREN = ?";
      rows = db.query(sql, SIREN, function (err, results) {
          if (err) throw err;
          if (rows.length == 1 && rows[0].pwd === password) {
              callback(true)
          } else {
              callback(false);
          }
      });
  },*/



  // Fonction de création d'un demande_joindre_org
  createDemande_joindre_org: function (SIREN, id_user, date_demande, callback) {
    var query = 'INSERT INTO Demande_joindre_org (SIREN, id_user, date_demande) VALUES (?, ?, ?)';
    var values = [SIREN, id_user, date_demande];

    db.query(query, values, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.insertId);
      }
    });
  },

  // Fonction de lecture d'un demande_joindre_org par SIREN
  getDemande_joindre_org: function (SIREN, callback) {
    var query = 'SELECT * FROM Demande_joindre_org WHERE SIREN = ?';
    var values = [SIREN];

    db.query(query, values, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0]);
      }
    });
  },

  // Fonction de mise à jour d'un demande_joindre_org
  updateDemande_joindre_org: function (SIREN, newId_user, newDate_demande, callback) {
    var query = 'UPDATE Demande_joindre_org SET ? WHERE SIREN = ?';

    db.query(query, [newId_user, newDate_demande, SIREN], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.affectedRows);
      }
    });
  },

  // Fonction de suppression d'un demande_joindre_org par SIREN
  deleteDemande_joindre_org: function (SIREN, callback) {
    var query = 'DELETE FROM Demande_joindre_org WHERE SIREN = ?';
    var values = [SIREN];

    db.query(query, values, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.affectedRows);
      }
    });
  }




}

