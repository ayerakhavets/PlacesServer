import mongoose from 'mongoose';
import time from './time';

const WorkTimeSchema = new mongoose.Schema({
    open: time.schema,
    close: time.schema
}, {_id: false});

export default mongoose.model('WorkTime', WorkTimeSchema)
