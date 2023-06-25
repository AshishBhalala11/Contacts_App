const fs = require('fs');
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, '../data/contacts.json');

// const contactsData = JSON.parse(fs.readFileSync(CONTACTS_FILE , 'utf-8'));

const listContacts = (req, res, next) => {
    fs.readFile(CONTACTS_FILE, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json(JSON.parse(data));
        }
      });
}

const getContact = (req, res, next) => {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    const contact = contacts.find((c) => c.id === parseInt(req.params.id));

    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
}

const createContact = (req, res, next) => {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    const newContact = {
        id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    };

    contacts.push(newContact);

    fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts), (err) => {
        if (err) {
        res.status(500).json({ message: err.message });
        } else {
        res.status(201).json(newContact);
        }
    });
}

const editContact = (req, res, next) => {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  
    if (contact) {
      contact.firstName = req.body.firstName;
      contact.lastName = req.body.lastName;
      contact.phoneNumber = req.body.phoneNumber;
      contact.email = req.body.email;
  
      fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts), (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json(contact);
        }
      });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
}

const deleteContact = (req, res, next) => {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));

    if (index !== -1) {
        const deletedContact = contacts.splice(index, 1)[0];

        fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts), (err) => {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              res.json(deletedContact);
            }
        });
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
}

module.exports = {
    listContacts,
    getContact,
    createContact,
    editContact,
    deleteContact
}