import fs    from 'fs';
import Place from '../models/place';

const myService = {
    SweetService: {
        SweetServicePort: {
            getPlace: function (args, callback) {
                Place.find({}, (err, places) => {
                    console.log(`SOAP: getPlace() ${args} ${_VI(args.x)} + ${_VI(args.y)}`);
                    if (err) {
                        console.log(`${timeLog()} ${err.name}`)
                    } else {
                        console.log(`${timeLog()} returned items: ${places.length}`);
                        callback(null, {number: places.length});
                    }
                })
            }
        }
    }
};

// Because ksoap2 throws an object
function _V(val) {
    let isObject = (a) => (!!a) && (a.constructor === Object);
    if (isObject(val)) {
        return val.value;
    } else {
        return val;
    }
}

function _VI(val) {
    return parseInt(_V(val));
}

const xml = fs.readFileSync(__dirname + '/myservice.wsdl', 'utf8');

export {xml, myService}
