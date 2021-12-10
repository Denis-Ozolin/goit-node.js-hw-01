const argv = require('yargs').argv;
const operations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await operations.listContacts();
      break;

    case 'get':
      const contact = await operations.getContactById(id);
      if(!contact){
          throw new Error(`Product with id=${id} not found`);
      }
      break;

    case 'add':
      const newContact = await operations.addContact(name, email, phone);
      break;

    case 'remove':
      await operations.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);


