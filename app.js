const fs = require("fs/promises");

fs.readFile("files/file.txt")
  .then(data => console.log(data))
  .catch(error => console.log(error.message))