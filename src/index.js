const stdin = process.openStdin();
const DashboardUserModel = require('./models/dashboardUser');
const knex = require('./config/db');
const chalk = require('chalk');
const prompt = require('prompt');

const userModel = new DashboardUserModel(knex);

console.log(chalk.bgBlue("Insira o username e password do usuaário a ser inserido"));
prompt.start();

let usuario = {};

prompt.get(['username', 'password'], function (err, result) {
  if (err) { return onErr(err); }

  usuario.username = result.username;
  usuario.password = result.password;

  console.log(chalk.bgBlue("Usuario a ser inserido: " + JSON.stringify(usuario) + " ok? (y/n)"));


  prompt.get(['answer'], (err, result) => {
    if (result.answer == 'y') {
      userModel.insertUser(usuario)
        .then(() => userModel.findByUsername(usuario.username))
        .then((user) => {
          console.log(chalk.bgGreen("Usuário inserido com sucesso: " + JSON.stringify(user)));
          process.exit();
        })
        .catch((err) => {
          console.log(chalk.bgRed(err));
          process.exit();
        });
    } else {
      console.log(chalk.bgRed("Inserção cancelada"));
      process.exit();
    }
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}
