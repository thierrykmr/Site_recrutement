var mysql = require("mysql");
var pool = mysql.createPool({
host: "tuxa.sme.utc", // "localhost",
user: "ai16p020",
password: "w97Q14oJm5BC",
database: "ai16p020"
});
module.exports = pool;



