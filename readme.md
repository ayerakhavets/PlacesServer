MongoDB terminology:

db - db

table - collection

row - document

column - field

CREATE a place (accessed at POST http://localhost:3000/places)

READ all places (accessed at GET http://localhost:3000/places)

DELETE all

READ the place with that id (accessed at GET http://localhost:3000/places/:id)

```javascript
    .get(getPlace)
    // UPDATE the place with this id (accessed at PUT http://localhost:3000/places/:id)
    .put(putPlace)
    // DELETE the place with this id (accessed at DELETE http://localhost:3000/places/:id)
```
