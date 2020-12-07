const express = require('express')
const router = express.Router()
const destinationCtrl = require('../controllers/destinations')

router.get('/new', destinationCtrl.new);
router.post('/', destinationCtrl.create)
router.get('/:id', destinationCtrl.show)
router.delete('/:id', destinationCtrl.deleteDestination)

module.exports = router