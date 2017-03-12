const stdin = process.openStdin();
const bcrypt = require('bcrypt-nodejs');

console.log("Insira a senha a ser encriptada:");

stdin.addListener("data", (data) => {

  console.log("entered " + data.toString().trim());

  const senhaEncriptada = bcrypt.hashSync(data.toString().trim());

  console.log("senha encriptada " + senhaEncriptada);

  process.exit();
})
