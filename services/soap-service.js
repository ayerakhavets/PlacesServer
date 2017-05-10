import fs    from 'fs';
import express from 'express';
import Place from '../models/place';

const myService = {
    SweetService: {
        SweetServicePort: {
            addReview: function (args, callback) {
                console.log(`args: ${_V(args.id)}, ${_V(args.author)}, ${_V(args.review)}`);

                let data = {author: `${_V(args.author)}`, text: `${_V(args.review)}`};
                var id = _V(args.id);
                //var b = '58fcd5793334e52114d48529';

                Place.update(
                    {'_id': _V(args.id)},
                    {$addToSet: {reviews: data}},
                    (err, reqs) => {
                        if (err) {
                            console.log(`${timeLog()} ${err.name}`)
                            callback(null, {number: 0});
                        } else {
                            console.log(`${timeLog()} Success? ${reqs}`)
                            callback(null, {number: 42});
                        }
                    }
                );
                //return {number: 42};
            }
        }
    }
};

// Because ksoap2 throws an object
function _V(val) {
    let isObject = (a) => (!!a) && (a.constructor === Object);
    if (isObject(val)) {
        return val.$value;
    } else {
        return val;
    }
}

const xml = fs.readFileSync(__dirname + '/myservice.wsdl', 'utf8');

export {xml, myService}
