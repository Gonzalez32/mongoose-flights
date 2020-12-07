const Flight = require('../models/flight')
const Destination = require('../models/destination')


module.exports = {
    new: newFlight,
    create,
    index,
    show,
    delete: deleteFlight,
    addToDestinations,
}

function newFlight(req, res) {
    res.render('flights/new', { err: '', title: 'New Flight' })
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const flight = new Flight(req.body)
    flight.save(function (err) {
        if (err) { return res.redirect('/flights/new') }
        res.redirect(`/flights/${flight._id}`)
    })
}

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights/index', { flights: flights, title: 'All Flights' })
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
        .populate('airport').exec( (err, flight) => {
            Destination.find({ _id: { $nin: flight.airport } },
                (err, destinations) => {
                    res.render('flights/show', { title: 'Flight Details', flight, destinations })
                })
        })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, (err, flight) => {
        res.redirect('/flights')
    })
}

function addToDestinations(req, res) {
    Flight.findByIdAndDelete(req.params.id, (err, flight) => {
        flight.airport.push(req.body.destinationId)
        flight.save((err) => {
            res.redirect(`/flights/${flight.id}`)
        }) 
    })
}
