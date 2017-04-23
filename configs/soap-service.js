import fs from 'fs';
import Place from '../models/place';

const isObject = (a) => {
    return (!!a) && (a.constructor === Object)
};

// Because ksoap2 throws an object.
function _V(val) {

    if (isObject(val)) {
        return val.$value;
    } else {
        return val;
    }
}

function _VI(val) {
    return parseInt(_V(val));
}

const myService = {
    SweetService: {
        SweetServicePort: {
            getPlace: function (args, callback) {
                Place.find({}, (err, places) => {
                    console.log(`SOAP: getPlace() ${args} ${_VI(args.x)} + ${_VI(args.y)}`);
                    if (err) {
                        errorLog(err)
                    } else {
                        console.log(`${timeLog()} returned items: ${places.length}`);
                        callback(null, {sum: places.length});
                    }
                })
            }
        }
    }
};

const xml = fs.readFileSync('configs/myservice.wsdl', 'utf8');
//const xml = fs.readFileSync(__dirname + '/myservice.wsdl', 'utf8');

export {xml, myService}
