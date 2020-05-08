'use strict'
module.exports =(sequelize) => {
	const User = sequelize.define('users', { email: Sequelize.TEXT, password: Sequelize.STRING, timestamps: false  });
	return User;
}
