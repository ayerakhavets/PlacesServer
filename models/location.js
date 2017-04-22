const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
        address: String,
        district: {
            type: String,
            enum: ['Tsentralny', 'Savetski', 'Pershamayski', 'Partyzanski',
                'Zavodski', 'Leninski', 'Kastrychnitski', 'Maskouski', 'Frunzenski']
        }
    },
    {_id: false}
);

module.exports = mongoose.model('Location', LocationSchema);