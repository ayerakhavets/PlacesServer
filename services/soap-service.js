import fs from "fs";
import Place from "../models/place";

const myService = {
    SweetService: {
        SweetServicePort: {
            addReview: function (args, callback) {
                console.log(`args: ${_V(args.id)}, ${_V(args.author)}, ${_V(args.text)}`);

                let review = {author: `${_V(args.author)}`, text: `${_V(args.text)}`};

                Place.update(
                    {'_id': _V(args.id)},
                    {$addToSet: {reviews: review}},
                    (err, success) => {
                        if (err) {
                            console.log(`${timeLog()} ${err.name}`);
                            callback(null, {error: 'occurred'});
                        } else {
                            console.log(`${timeLog()} review created`);
                            callback(null, review);
                        }
                    }
                );
            }
        }
    }
};

// Because ksoap2 lib throws an object
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
