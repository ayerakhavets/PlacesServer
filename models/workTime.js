import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        min: [0, 'wrong hour format'],
        max: [23, 'wrong hour format']
    },
    minutes: {
        type: Number,
        min: [0, 'wrong minutes format'],
        max: [59, 'wrong minutes format']
    }
}, {_id: false});

const WorkTimeSchema = new mongoose.Schema({
    open: TimeSchema,
    close: TimeSchema
}, {_id: false});

export default mongoose.model('WorkTime', WorkTimeSchema)
