import location from "./location";
import mongoose from "mongoose";
import review from "./review";
import workTime from "./workTime";


const ImageSchema = new mongoose.Schema({image: String}, {_id: false});
const TagSchema = new mongoose.Schema({tag: String}, {_id: false});

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
    location: {
        type: location.schema,
        required: [true, 'Why no location?']
    },
    workTime: workTime.schema,
    tags: [TagSchema],
    images: [ImageSchema],
    reviews: [review.schema]
}, {versionKey: false}, {minimize: false});

export default mongoose.model('Place', PlaceSchema);
