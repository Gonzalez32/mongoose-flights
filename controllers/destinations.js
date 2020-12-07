const Destination = require('../models/destination')
// const Flight = require('../models/flight')

module.exports = {
    new: newDestination,
    create,
    show,
    deleteDestination,
}

function newDestination(req, res) {
    Destination.find({}, (err, destinations) => {
        res.render('destinations/new', { title: 'Add Destination', destinations })
    })
}
function create(req, res) {
    Destination.create(req.body, (err, destinations) => {
        res.redirect('/destinations/new')
    })
}

function show(req, res) {
    Destination.findById(req.params.id, (err, destination) => {
        res.render('destinations/show', { title: 'Destination Detail', destination })
    })
}

function deleteDestination(req, res) {

    Destination.findByIdAndDelete(req.params.id, (err, destinations) => {
        console.log('Errors')
        res.redirect('/destinations/new')
    })
}