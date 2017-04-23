import location from './location';
import mongoose from 'mongoose';
import time from './workTime';
import review from './review';

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
    reviews: [review.schema],
    images: [String],
    locations: [location.schema],
    tags: [String]
}, {versionKey: false}, {minimize: false});

export default mongoose.model('Place', PlaceSchema);