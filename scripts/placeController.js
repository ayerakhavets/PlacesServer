import Place from "../models/place";


/**
 * POST /places
 * Creates an object in the collection.
 */
export function createPlace(req, res) {
    Place.create(req.body, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`);
        } else {
            res.status(201).json(place);
            console.log(`${timeLog()} ${place.name} created`);
        }
    });
}

/**
 * GET /places
 * Gets all objects from the collection.
 */
export function getPlaces(req, res) {
    Place.find({}, (err, places) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`);
        } else {
            res.json(places);
            console.log(`${timeLog()} returned ${places.length} items`);
        }
    });
}

/**
 * GET /places/:id
 * Gets an object with the specified id from the collection.
 */
export function getPlace(req, res) {
    Place.findById(req.params.id, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`);
        } else if (place === null) {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`);
        } else {
            res.json(place);
            console.log(`${timeLog()} ${place.id} returned`);
        }
    });
}

/**
 * PUT /places/:id
 * Updates an object with the specified id in the collection.
 */
export function updatePlace(req, res) {
    Place.findByIdAndUpdate(req.params.id, req.body, (err, place) => {
        if (err) {
            res.sendStatus(400);
            console.log(`${timeLog()} ${err.name}`);
        } else if (place === null) {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`);
        } else {
            res.json(place);
            console.log(`${timeLog()} ${place.id} updated`);
        }
    });
}

/**
 * DELETE /places
 * Deletes all objects from the collection.
 */
export function deletePlaces(req, res) {
    Place.remove({}, (err) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`);
        } else {
            res.sendStatus(204);
            console.log(`${timeLog()} ${Place.collection.collectionName} collection removed`);
        }
    });
}

/**
 * DELETE /places/:id
 * Deletes an object with the specified id from the collection.
 */
export function deletePlace(req, res) {
    Place.findByIdAndRemove(req.params.id, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`);
        } else if (place !== null) {
            res.sendStatus(204);
            console.log(`${timeLog()} ${place.name} removed`);
        } else {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`);
        }
    });
}
