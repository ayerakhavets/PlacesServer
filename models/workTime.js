import mongoose from 'mongoose';

const TimeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        min: [0, 'wrong format'],
        max: [23, 'wrong format']
    },
    minutes: {
        type: Number,
        min: [0, 'wrong format'],
        max: [59, 'wrong format']
    }
});
//mongoose.model('Time', TimeSchema);


const WorkTimeSchema = new mongoose.Schema({
    open: TimeSchema,
    close: TimeSchema
}, {_id: false});

export default mongoose.model('WorkTime', WorkTimeSchema)
