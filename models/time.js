const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema(
    {
        open: {
            type: Number,
            min: [0, 'wrong format'],
            max: [23, 'wrong format']
        },
        close: {
            type: Number,
            min: [0, 'wrong format'],
            max: [23, 'wrong format']
        }
    },
    {_id: false}
);

module.exports = mongoose.model('Time', TimeSchema);