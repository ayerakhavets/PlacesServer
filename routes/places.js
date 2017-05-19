import express from "express";
import * as placeController from '../scripts/placeController';


const router = new express.Router();

// Routes ending with "/"
router.route('/')
    .post(placeController.createPlace)
    .get(placeController.getPlaces)
    .delete(placeController.deletePlaces);

// Routes ending with "/:id"
router.route('/:id')
    .get(placeController.getPlace)
    .put(placeController.updatePlace)
    .delete(placeController.deletePlace);

export default router;
