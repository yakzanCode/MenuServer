const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/getAllItems', menuController.getAllItems);
router.get('/getAllSections', menuController.getAllSections);
router.get('/getItemsBySection/:section', menuController.getItemsBySection);
router.delete('/deleteItem/:name', menuController.deleteItem);
router.post('/addItem/', menuController.addItem);
router.put('/updateItem/:name', menuController.updateItem);
router.get('/test', menuController.test);

module.exports = router;
