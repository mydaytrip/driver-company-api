# Trip API

A trip is a representation of passenger transportation from point A to point B. One trip can cover multiple orders in case of a shared ride.

## Trips endpoint

> To search for all trips assigned to your company that were created or edited between two dates, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips"
  -H "x-api-key: your-api-key"
```

```javascript

```

```python

```

> The above call returns JSON structured like this:

```json

```

This endpoint returns all trips assigned to your company. You can filter the trips by created/edited date.

### URL path

`/driver-company/v1/trips`

### Query Parameters

Parameter           | Type    | Description
------------------- | ------- | -----------
originLatitude      | number  | Origin latitude in degrees.
originLongitude     | number  | Origin longitude in degrees.
destinationLatitude | number  | Destination latitude in degrees.
originLongitude     | number  | Destination longitude in degrees.
departureTime       | integer | Departure time as a UNIX epoch timestamp in seconds.
passengersCount     | integer | Count of passengers to transport. Must be between 1 and 10.

### Response body

Property        | Type                              | Description
--------------- | --------------------------------- | -----------
searchId        | string                            | Unique id of your search query.
expiresAt       | string                            | UTC timestamp of when the offers in this response expire. After this time it is no longer possible to book them, you need to make a new search.
passengersCount | integer                           | The count of passengers this search query was for.
currency        | string                            | Currency used for all prices in this response.
options         | list of [TripOption](#tripoption) | List of options for this trip.

### Error status codes

Status code | Description
----------- | -----------
400         | Invalid request - missing mandatory query parameter, parameter has wrong type or wrong passenger count.
401         | API key missing or invalid.
