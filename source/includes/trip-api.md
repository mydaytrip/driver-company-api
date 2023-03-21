# Trip API

A trip is a representation of passenger transportation from point A to point B. One trip can cover multiple orders in case of a shared ride.

## Trips endpoint

> To search for all trips assigned to your company with departure time from the start of today, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157"
  -H "x-api-key: your-api-key"
```

```javascript

```

```python

```

> To search for all trips assigned to your company with departure time between two specified dates, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157"
  -H "x-api-key: your-api-key"
```

```javascript

```

```python

```

> The above calls return JSON structured like this:

```json
{
  "pageIndex": 0,
  "pageSize": 100,
  "tripCount": 100,
  "nextPage": true,
  "trips": [
    {
      "id": "9ed90a6a-f09f-4843-b6ae-6f98859eb877",
      "type": "private",
      "vehicleType": "sedan",
      "englishSpeakingDriver": true,
      "departureAt": "2023-07-05T18:00:00Z",
      "acceptationNote": "Fiat Tipo station vagon",
      "orders": [
        {
          "id": "11e4f50f-37cb-4f01-9d0d-9b76787a0dca",
          "bookingReference": "11E4F5",
          "departureAt": "2023-07-05T18:00:00Z",
          "origin": {
            "name": "Prague",
            "latitude": 50.0755,
            "longitude": 14.4378,
          },
          "destination": {
            "name": "Vienna",
            "latitude": 48.2082,
            "longitude": 16.3738,
          },
          "pickupAddress": "Metropolitan Old Town hotel, Haštalská, Old Town, Czechia",
          "dropoffAddress": "Hotel Josefshof am Rathaus, Josefsgasse, Vienna, Austria",
          "passengersCount": 3,
          "leadPassengerName": "Jan Novák",
          "leadPassengerPhone": "+420111111111",
          "requestedChildSeats": {
            "rearFacing": 0,
            "forwardFacing": 0,
            "boosterSeat": 0,
            "booster": 1,
          },
          "luggage": {
            "carryOns": 2,
            "suitcases": 3,
          },
          "customerNote": "We would like some non-sparkling water",
          "driverNote": "For this trip, you must download the Daytrip Driver app and record the trip with the “Track a trip” button. For extra certainty, take a screenshot of your location on Google maps or GPS (and a selfie at the pick-up location?) at the scheduled pick-up time. If you do not, you might not get paid.",
          "cashPayment": true,
        }
      ]
    }
  ]
}
```

This endpoint returns all trips assigned to your company. You can filter the trips by departure time.

### URL path

`/driver-company/v1/trips`

### Query Parameters

Parameter           | Type    | Description
------------------- | ------- | -----------
departureTimeFrom   | integer | Minimum departure time as a UNIX epoch timestamp in seconds. If not provided it will default to start of current day.
departureTimeTo     | integer | Maximum departure time as a UNIX epoch timestamp in seconds. If not provided then no maximum filter will be applied and every future trip after `departureTimeFrom` will be returned.
pageIndex           | integer | Page index to return. If not provided it will default to 0.

### Response body

Property        | Type                              | Description
--------------- | --------------------------------- | -----------
pageIndex       | integer                           | Page index of this result section, starting from 0.
pageSize        | integer                           | Size of each page.
tripCount       | integer                           | Actual count of trips on this page, can be lower than `pageSize` for the last page.
nextPage        | boolean                           | Specifies if there is a next page with results after this one.
trips           | list of [Trip](#trip)             | List of trips on this page.

### Error status codes

Status code | Description
----------- | -----------
400         | Invalid request - missing mandatory query parameter, parameter has wrong type or wrong passenger count.
401         | API key missing or invalid.

# Entities

Below is a documentation of all object entities returned by the Daytrip driver company API.

## Trip

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
id                    | string                            | Unique id of this trip.
type                  | string                            | Type of the trip. "private" or "pool" (shared).
vehicleType           | string                            | Type of vehicle for the trip. "sedan", "mpv", "van", "luxury" or "shuttle"
vehicleId             | string                            | Optional. Id of the assigned vehicle, if assigned.
vehicleModel          | string                            | Optional.  Information about assigned vehicle model, if assigned and we have the info.
englishSpeakingDriver | boolean                           | Specifies if this trip requires an English-speaking driver.
departureAt           | string                            | UTC timestamp of the departure date with time. For a trip covering multiple orders this will be the minimum from all orders.
acceptationNote       | string                            | Optional. Acceptation note for this trip.
orders                | list of [Order](#order)           | List of orders that this trip covers. Will be one order for private trips and one or more for pool trips.

## Order

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
id                    | string                            | Unique id of this order.
bookingReference      | string                            | Booking reference of this order.
departureAt           | string                            | UTC timestamp of the departure date with time.
origin                | [Location](#location)             | Information about the origin location.
destination           | [Location](#location)             | Information about the destination location.
pickupAddress         | string                            | The pickup address.
dropoffAddress        | string                            | The dropoff address.
passengersCount       | integer                           | Count of passengers for this order.
leadPassengerName     | string                            | Name of the lead passenger.
leadPassengerPhone    | string                            | Phone of the lead passenger, including country code.
requestedChildSeats   | [ChildSeatsCounts](#childseats)   | Counts of requested child seats by type.
luggage               | [Luggage](#luggage)               | Counts of luggage per type.
customerNote          | string                            | Customer's note. Includes flight/train number.
driverNote            | string                            | Note for the driver.
cashPayment           | boolean                           | Specifies if this order is paid in cash.

## Location

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
name                  | string                            | Name of the location.
latitude              | number                            | Optional. Latitude in degrees, if provided.
longitude             | number                            | Optional. Longitude in degrees, if provided.

## ChildSeats

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
rearFacing            | integer                           | How many rear facing child seats were requested for this order.
forwardFacing         | integer                           | How many forward facing child seats were requested for this order.
boosterSeat           | integer                           | How many booster seats were requested for this order.
booster               | integer                           | How many boosters were requested for this order.

## Luggage

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
carryOns              | integer                           | Total count of carry ons for all passengers in this order.
suitcases             | integer                           | Total count of suitcases for all passengers in this order.
