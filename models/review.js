import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    author: String,
    text: String
}, {_id: false});

export default mongoose.model('Review', ReviewSchema)
