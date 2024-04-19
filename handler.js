const validator = require('validator');
const fs = require('fs');

const { dataPath } = require('./constVar.js');
const { pool } = require('./postgres-db.js')

/** 
 * Check 3 inputs: name, mobile, email
 * Does the name already exist in contacts list (create & update) and are mobile and email valid?
 * Return array of strings of invalid messages if there is
 */
const checkInput = (contacts, name, mobile, email, updateMode=false, oldName='') => {
    let invalidMessages = [];
    // Does the name exist in contacts list?
    if ((updateMode && contacts.findIndex((contact) => contact.name.toLowerCase() != oldName &&
        contact.name.toLowerCase() == name.toLowerCase()) != -1) || 
        (!updateMode && contacts.findIndex((contact) => contact.name.toLowerCase() == name.toLowerCase()) != -1)) {
        invalidMessages.push('The name already exists. Please enter a different name.');   
    }
    // Is mobile phone number valid?
    if (!validator.isMobilePhone(mobile, 'id-ID')) {
        invalidMessages.push('Your mobile phone number must be Indonesia number.');
    }
    // Is email address valid?
    if (email && !validator.isEmail(email)) {
        invalidMessages.push('Your email address is invalid. Please enter a valid email address.');
    }
    return invalidMessages;
}

// All below are deprecated to-json-handlers

// /** Add contact, return true if successfully added
//  * Assumed that input in newContacts is valid as specified
//  */
// const addContact = (contacts, newContact) => {
//     try {
//         contacts.push(newContact);
//         fs.writeFileSync(dataPath, JSON.stringify(contacts));
//         return true;
//     } catch (err) {
//         return false;
//     }
// }

// /** Update contact, return true if successfully updated
//  * Assumed that input in newContacts is valid
// */
// const updateContact = (contacts, oldName, newContact) => {
//     const index = contacts.findIndex((contact) => contact.name.toLowerCase() == oldName.toLowerCase());

//     // if the name in contacts exists,then update the contact
//     if (index != 1) {
//         contacts[index] = newContact;
//         fs.writeFileSync(dataPath, JSON.stringify(contacts));
//         return true;
//     } else {
//         return false;
//     }
// }

// // Delete contact, return true if successfully deleted
// const deleteContact = (contacts, name) => {
//     const newContacts = contacts.filter((contact) => contact.name.toLowerCase() != name.toLowerCase());

//     // if the name in contacts exists, then delete the contact in db
//     if (newContacts.length != contacts.length) { // newContacts.length == contacts.length - 1
//         contacts = newContacts;
//         fs.writeFileSync(dataPath, JSON.stringify(newContacts));
//         return true;
//     } else {
//         return false;
//     }
// }
// }

// module.exports = { checkInput, addContact, updateContact, deleteContact };

module.exports = { checkInput };