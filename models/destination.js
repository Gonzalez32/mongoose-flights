const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    destination: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('Destination', destinationSchema)