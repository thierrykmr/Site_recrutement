var db = require('./db.js');
module.exports = {

  read: function (id, callback) {


    db.query("select * from PIECE where id= ?", id, function
      (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  readall: function (callback) {
    db.query("select * from PIECE", function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  /*areValid: function (id, password, callback) {
      sql = "SELECT pwd FROM Piece WHERE id = ?";
      rows = db.query(sql, id, function (err, results) {
          if (err) throw err;
          if (rows.length == 1 && rows[0].pwd === password) {
              callback(true)
          } else {
              callback(false);
          }
      });
  },*/



  // Fonction de création d'un piece
  createPiece: function (lieu,CV,lettre_motiv, callback) {
    var query = 'INSERT INTO  PIECE (lieu,CV,lettre_motiv) VALUES (?,?,?)';
    var values = [lieu,CV,lettre_motiv];

    db.query(query, values, (err, result) => {
      if (err) throw err;
      
      callback(result);
      
    });
  },

  // Fonction de lecture d'un piece par id
  /*getPiece: function (id, callback) {
    var query = 'SELECT * FROM PIECE WHERE id = ?';
    var values = [id];

    db.query(query, values, (err, result) => {
      if (err) throw err;
     
      callback( result);
      
    });
  },
*/
  // Fonction de mise à jour d'un piece
  updatePiece: function ( newLieu, callback) {
    var query = 'UPDATE piece SET ? WHERE id = ?';

    db.query(query, [newLieu], (err, result) => {
      if (err) throw err;
     
        callback(result);
      
    });
  },

  // Fonction de suppression d'un piece par id
  deletePiece: function (id, callback) {
    var query = 'DELETE FROM piece WHERE id = ?';
    var values = [id];

    db.query(query, values, (err, result) => {
      if (err) throw err;
      
        callback(result);
      
    });
  }




}

