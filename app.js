const fs = require('fs');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const { 
    checkInput, addContact, updateContact, deleteContact,
} = require('./handler.js');

const {
    port, appName, author, dirPath, dataPath
} = require('./constVar.js');
let invalidMessages = [];

// check if there is private directory for database contact.json
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf8');
}

// Read json db to access it
const contactsFile = fs.readFileSync(dataPath, 'utf8');
const contacts = JSON.parse(contactsFile);

app.use(express.static('public'));
app.use(morgan('dev')); // check & debug logging in development

app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/layout');

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.status(200);
    res.render('index', {
        title: `Homepage - ${appName}`,
        author,

    });
});

app.get('/about', (req, res) => {
    res.status(200);
    res.render('about', {
        title: `About Page - ${appName}`,
    });
});

// CRUD Contact
/** TO DO
 * post alert: create, delete, update
 * bootstraping
 */
// Read list => show contact page + error whenever there is invalid input
app.get('/contact', (req, res) => {
    res.status(200);
    res.render('contact', {
        title: `Contact Page - ${appName}`,
        contacts,
        invalidMessages,
        input: {
            name: '',
            mobile: '',
            email: '',
        }
    });
});

// Create a new contact
app.post('/contact/create', (req, res) => {
    const newContact = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
    }

    invalidMessages = checkInput(contacts, newContact.name, newContact.mobile, newContact.email);
    let oldInput = newContact;
    if (invalidMessages.length == 0) {
        if (addContact(contacts, newContact)) {
            oldInput = {
                name: '',
                mobile: '',
                email: '',
            };
            res.status(200);
        } else {
            res.status(400); // failed to add contact
        }
    } else {
        res.status(400); // due to invalid input
    }

    // res.redirect('/contact');
    res.render('contact', {
        title: `Contact Page - ${appName}`,
        contacts,
        invalidMessages,
        input: oldInput,
    });
});

// Read details
app.get('/detail/:name', (req, res) => {
    const name = req.params.name;
    // guaranteed that contact is always found
    const contact = contacts[contacts.findIndex((contact) => contact.name.toLowerCase() === name.toLowerCase())];
    // const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    
    res.status(200);
    res.render('detail', {
        title: `Detail Page - ${appName}`,
        contact,
        invalidMessages: [],
        input: contact,
    });
});

// Update/Edit
app.post('/detail/update/:name', (req, res) => {
    let oldName = req.params.name;
    // guaranteed that contact is always found
    const contact = contacts[contacts.findIndex((contact) => contact.name.toLowerCase() === oldName.toLowerCase())];
    // const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    const updatedContact = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
    }

    invalidMessages = checkInput(contacts, updatedContact.name, updatedContact.mobile, updatedContact.email, update=true, oldName=oldName);
    if (invalidMessages.length == 0) {
        if (updateContact(contacts, oldName, updatedContact)) {
            res.status(200);
            res.redirect('/contact');
        } else {
            res.status(404); // contact not found, failed to update contact
        }
    } else {
        res.status(400); // due to invalid input
        res.render('detail', {
            title: `Detail Page - ${appName}`,
            contact,
            invalidMessages,
            input: updatedContact,
        });
    }
});

// Delete
app.post('/contact/delete', (req, res) => {
    const nameToDelete = req.body.name;

    if (deleteContact(contacts, nameToDelete)) {
        res.status(200);
    } else { // in case of contact not found
        res.status(404);
    }
    
    res.redirect('/contact');
});

// Page not found: 404
app.use('/', (req, res) => {
    res.status(404);
    res.render('not-found', {
        title: `Page Not Found`,
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// module.exports = { dataPath };