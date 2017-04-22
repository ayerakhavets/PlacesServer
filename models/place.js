const mongoose = require('mongoose');
const location = require('./location');
const time = require('./time');

const PlaceSchema = new mongoose.Schema({
    description: String,
    prices: {
        type: String,
        enum: ['Cheap', 'Moderate', 'Expensive', 'Nightmare']
    },
    type: {
        type: String,
        enum: ['Zabegalovka', 'Cafe', 'Restaurant'],
        required: [true, 'Why no type?']
    },
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    time: time.schema,
    reviews: [String],
    images: [String],
    locations: {
        type: [location.schema],
        required: [true, 'Why no location?']
    },
    tags: [String]
}, {versionKey: false}, {minimize: false});

mongoose.model('Place', PlaceSchema);

module.exports = mongoose.model('Place');
