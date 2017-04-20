const bcrypt = require('bcrypt-nodejs');

const TABLE_NAME = 'dashboard_user';

class DashboardUser {

  constructor(db) {
    this.db = db;
  }

  findByUsername(username) {
    return this.db(TABLE_NAME)
      .where('username', username)
      .first()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw err;
      })
  }

  insertUser(user) {
    let newUser = {};
    newUser = Object.assign({}, user);
    newUser.password = bcrypt.hashSync(user.password);
    return this.db(TABLE_NAME)
      .returning('id')
      .insert(newUser)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = DashboardUser;
