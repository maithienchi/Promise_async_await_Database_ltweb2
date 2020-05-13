
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./db')
const Model = Sequelize.Model;


class User extends Model {
    static async findUserById(id) {
        return User.findByPk(id);
    }
    static async findUserByEmail(email) {
        return User.findOne({
            where: {
                email,
            }
        });
    }
    static hashPassword(password){
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password,hashPassword){
        return bcrypt.compareSync(password, hashPassword);
    }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'user',
});

// const users = [
//     { id: 1, email: '1760016', displayName: 'Mai Thiện Chí', password: '$2b$10$ULQEO.0pUKdv9/GAn6K08e27wUUEMFvh7ME2qkcjJaQmh1JLROsnG'},
// ];

module.exports = User;