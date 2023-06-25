const { Router } = require('express');

const contactController = require('../controllers/ContactsController');

const router = Router();

router.get('/contacts', contactController.listContacts);

router.get('/contacts/:id', contactController.getContact);

router.post('/contacts', contactController.createContact);

router.put('/contacts/:id', contactController.editContact);

router.delete('/contacts/:id', contactController.deleteContact);


module.exports = router;
