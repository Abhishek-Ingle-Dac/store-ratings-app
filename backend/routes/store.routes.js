const router = require('express').Router();
const storeController = require('../controllers/store.controller');

// Public API — no auth
router.get('/', storeController.listStores);
router.get('/:id', storeController.getStore);

// Create, Update, Delete — could add auth if needed
router.post('/', storeController.createStore);
router.put('/:id', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

module.exports = router;
