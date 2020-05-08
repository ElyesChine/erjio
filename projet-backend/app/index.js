const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 3000;
//TODO read crendentials from a config file (or any approch that hides the credentials)
const sequelize = new Sequelize('mysql://root:elyeschine1!ntbpe@localhost:3306/db_application');

app.get('/', (req, res) => res.send('App is running'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
sequelize
  .authenticate()
  .then(() => {
	      console.log('Connection has been established successfully.');
	    })
  .catch(err => {
	      console.error('Unable to connect to the database:', err);
	    });


const User = sequelize.define('users', { email: Sequelize.TEXT, password: Sequelize.TEXT, dateOfBirth: Sequelize.DATE, username: Sequelize.TEXT, sexe: Sequelize.TEXT   });
sequelize.sync({ })
  .then(() => {
	      console.log(`Database & tables created!`);

	      /*Note.bulkCreate([
		            { note: 'pick up some bread after work', tag: 'shopping' },
		            { note: 'remember to write up meeting notes', tag: 'work' },
		            { note: 'learn how to use node orm', tag: 'work' }
		          ]).then(function() {
				        return Note.findAll();
				      }).then(function(notes) {
					            console.log(notes);
					          });*/
	    });

app.get('/users/', function(req, res) {
	  User.findAll({ where: { email: req.query.email, password: req.query.password } }).then(users => res.json(users));
});
app.get('/users/:email', function(req, res) {                                                                                                                                                                   User.findAll({ where: { email: req.params.email, } }).then(users => res.json(users));                                                                     }); 
app.post('/users', function(req, res) {
	  User.create({ email: req.query.email, password: req.query.password, dateOfBirth: req.query.dateOfBirth, username: req.query.username, sexe: req.query.sexe }).then(function(user) {
		      res.json(user);
		    });
});
