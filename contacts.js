const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function listContacts() {
  const contacts = await getContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const result = contacts.find(({ id }) => parseInt(id) === contactId);
  if (!result) {
    return null
  };
  console.log(result);
  return result;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const contactIndex = contacts.findIndex(({id}) => parseInt(id) === contactId);
  if (contactIndex === -1) {
      return null;
  }
  const newContacts = contacts.filter((_, index) => index !== contactIndex);
  await updateContacts(newContacts);
  console.table(newContacts);
  return contacts[contactIndex];
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = {id: "0", name, email, phone}
  const newContacts = [...contacts, newContact]
  await updateContacts(newContacts);
  console.table(newContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};