const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  if (!result) {
    return null
  };
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({id}) => id === contactId);
    if(contactIndex === -1){
        return null;
  }
  const newContacts = contacts.filter((_, index) => index !== contactIndex);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[contactIndex];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {id: 33, name, email, phone}
  const newContacts = [...contacts, newContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};