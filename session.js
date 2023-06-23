var sessions = require("express-session");
module.exports = {
  init: () => {
    return sessions({
      secret: "xxxzzzyyyaaabbbcc",
      saveUninitialized: true,
      cookie: { maxAge: 300 * 1000 }, // 5 minutes
      resave: false,
    });
  },
  creatSession: function (session, mail, role) {
    session.userid = mail;
    session.role = role;
    session.save(function (err) {
      //console.log(err);
    });
    return session;
  },

  isConnected: (session, role) => {
 
    if (!session.userid || session.userid===undefined) return false;
    if (role && session.role !== role) return false;
    return true;
  },

  deleteSession: function (session) {
    session.destroy();
  },
};

