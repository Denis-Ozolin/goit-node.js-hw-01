// index.js
// const argv = require('yargs').argv;
const operations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await operations.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await operations.getContactById(id);
      if(!contact){
          throw new Error(`Product with id=${id} not found`);
      }
      console.log(contact);
      break;

    case 'add':
      const newContact = await operations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      await operations.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction({ action: "add", name: "Lisa", email: "lisa@gmail.com", phone: "666-666-66" });


