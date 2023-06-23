var db = require('./db.js');
module.exports = {
    read: function (id_user, callback) {


        db.query("select * from  CANDIDATURE where id_offre= ?", id_user, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from CANDIDATURE", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    /*areValid: function (id_user, password, callback) {
        sql = "SELECT pwd FROM USERS WHERE id_user = ?";
        rows = db.query(sql, id_user, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },*/



// Fonction de création d'un CANDIDATURE
create:function(id_offre,callback) {
  var query = 'INSERT INTO CANDIDATURE( id_offre) VALUES ( ?)';
  var values = [ id_offre];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    callback(result);
    
  });
},

// Fonction de lecture d'une candidature par id_user
/*getCandidature:function(id_user, callback) {
  var query = 'SELECT * FROM CANDIDATUREWHERE id_user = ?';
  var values = [id_user];

  db.query(query, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result[0]);
    }
  });
},
*/
// Fonction de mise à jour d'une candidature
updateCandidature:function(id_user,newDate_candidaure, id_offre, callback) {
  var query = 'UPDATE CANDIDATURE SET ? WHERE id_offre = ?';

  db.query(query, [newDate_candidaure], (err, result) => {
    if (err) throw err;
    
   callback(result);
    
  });
},

// Fonction de suppression d'une candidature par id_user
deleteCandidature:function(id_user, callback) {
  var query = 'DELETE FROM CANDIDATURE WHERE id_offre = ?';
  var values = [id_offre];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    callback(result);
    
  });
}
}
    
