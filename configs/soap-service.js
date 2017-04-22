const fs = require('fs');
const express = require('express');
const Place = require('../models/place');

isObject = function (a) {
    return (!!a) && (a.constructor === Object)
}

// ИБО ksoap2 кидает объект
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
// zреферат по сборщикам мусора в xamarin


const errorLog = (err) => {
    console.log(timeLog() + err.message)
}

const myService = {
    SweetService: {
        SweetServicePort: {
            getPlace: function (args, callback) {
                Place.find({}, (err, places) => {
                    if (err) {
                        errorLog(err)
                    } else {
                        console.log(timeLog() + `returned items: ${places.length}`)
                        callback(null, {sum: 5});
                    }
                })

                // console.log(args)
                // console.log(_VI(args.x) + _VI(args.y))
                // return {
                //     sum: _VI(args.x) + _VI(args.y)//"101"//parseInt(args.x)+parseInt(args.y)
                // }
            }
        }
    }
}

//var xml = fs.readFileSync('configs/myservice.wsdl', 'utf8')
const xml = fs.readFileSync(__dirname + '/myservice.wsdl', 'utf8')

module.exports.xml = xml
module.exports.myService = myService