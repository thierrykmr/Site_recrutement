var db = require('./db.js');
module.exports = {
    
    read: function (intitule, callback) {


        db.query("select * from OFFRE where intitule= ?", intitule, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from OFFRE", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallval: function (callback) {
      db.query("select * from OFFRE WHERE now() <= date_validite", function (err, results) {
          if (err) throw err;
          callback(results);
      });
  },

  readallex: function (callback) {
    db.query("select * from OFFRE WHERE now() > date_validite", function (err, results) {
        if (err) throw err;
        callback(results);
    });
},



    /*areValid: function (date-validite, password, callback) {
        sql = "SELECT pwd FROM OFFRE WHERE id = ?";
        rows = db.query(sql, date_validite, function (err, results) {
            if (err) throw err;
            if (date_validite<=date) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },*/
   
        //todo 


// Fonction de création d'un offre
createOffre: function( date_validite, indication, createur, callback) {
  var query = 'INSERT INTO OFFRE (date_validite, indication, createur) VALUES (?, ?, ?)';
  var values = [date_validite, indication,createur];
  

  db.query(query, values, (err, result) => {
    if (err) throw err;
    callback(result);
    
  });
},

// Fonction de lecture d'un offre par id
 getOffre : function(id, callback) {
  var query = 'SELECT * FROM OFFRE WHERE id = ?';
  var values = [id];

  db.query(query, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result[0]);
    }
  });
},

// Fonction de mise à jour d'un offre
 updateOffre :function(id, newNombre_piece, newDate_validite, newIndication, newCreateur, callback) {
  var query = 'UPDATE OFFRE SET ? WHERE id = ?';

  db.query(query, [newNombre_piece, newDate_validite, newIndication, newCreateur, id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
},

// Fonction de suppression d'un offre par id
 delete:function(id, callback) {
  var query = 'DELETE FROM OFFRE WHERE id = ?';
  var values = [id];

  db.query(query, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
}


        
}
    
