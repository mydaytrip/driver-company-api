# Trip API

A trip is a representation of passenger transportation from point A to point B. One trip can cover multiple passenger groups in case of a shared ride.

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

> To get the second page of results, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157&pageIndex=1"
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
      "passengerGroups": [
        {
          "id": "11e4f50f-37cb-4f01-9d0d-9b76787a0dca",
          "bookingReference": "11E4F5",
          "departureAt": "2023-07-05T18:00:00Z",
          "origin": {
            "name": "Prague",
            "country": "Czech Republic",
          },
          "destination": {
            "name": "Vienna",
            "country": "Austria",
          },
          "pickup": {
            "address": "Metropolitan Old Town hotel, Haštalská, Old Town, Czechia",
          },
          "dropoff": {
            "address": "Hotel Josefshof am Rathaus, Josefsgasse, Vienna, Austria",
          },
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
    },
    {
      "id": "64071bc2-b0f8-48f0-a797-1a438eb01caa",
      "type": "pool",
      "vehicleType": "shuttle",
      "englishSpeakingDriver": true,
      "departureAt": "2023-07-05T18:00:00Z",      
      "passengerGroups": [
        {
          "id": "a988a761-3d71-43cb-b290-9be150245a28",
          "bookingReference": "A988A7",
          "departureAt": "2023-07-05T18:00:00Z",
          "origin": {
            "name": "Positano",
            "country": "Italy",
          },
          "destination": {
            "name": "Naples",
            "country": "Italy",
          },
          "pickup": {
            "address": "Mandara Parking",
          },
          "dropoff": {
            "address": "Naples Airport: Naples Airport",
          },
          "passengersCount": 1,
          "leadPassengerName": "Jan Novák",
          "leadPassengerPhone": "+420111111111",
          "luggage": {
            "carryOns": 1,
            "suitcases": 1,
          },
          "customerNote": "I would like some non-sparkling water",
          "cashPayment": true,
        },
        {
          "id": "3919ca49-7153-4c50-b395-56bc026d30be",
          "bookingReference": "3919CA",
          "departureAt": "2023-07-05T18:30:00Z",
          "origin": {
            "name": "Positano",
            "country": "Italy",
          },
          "destination": {
            "name": "Naples",
            "country": "Italy",
          },
          "pickup": {
            "address": "Villa Yiara, Viale Pasitea, Positano, SA, Italy",
            "latitude": 40.628749,
            "longitude": 14.4813395,
          },
          "dropoff": {
            "address": "Naples city center (Napoli Centrale Train Station): Naples city center (Napoli Centrale Train Station",
          },
          "passengersCount": 1,
          "leadPassengerName": "Jan Sokol",
          "leadPassengerPhone": "+420333333333",
          "luggage": {
            "carryOns": 1,
            "suitcases": 1,
          },
          "customerNote": "I would like some sparkling water",
          "cashPayment": true,
        }
      ]
    }
  ]
}
```

This endpoint returns all trips assigned to your company (split into multiple pages in case of high trip counts). You can filter the trips by departure time.

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

Property              | Type                                       | Description
--------------------- | ------------------------------------------ | -----------
id                    | string                                     | Unique id of this trip.
type                  | string                                     | Type of the trip. "private" or "pool" (shared).
vehicleType           | string                                     | Type of vehicle for the trip. "sedan", "mpv", "van", "luxury" or "shuttle"
vehicleId             | string                                     | Optional. Id of the assigned vehicle, if assigned.
vehicleModel          | string                                     | Optional.  Information about assigned vehicle model, if assigned and we have the info.
englishSpeakingDriver | boolean                                    | Specifies if this trip requires an English-speaking driver.
departureAt           | string                                     | UTC timestamp of the departure date with time. For a trip covering multiple passenger groups this will be the minimum from all passenger groups.
acceptationNote       | string                                     | Optional. Acceptation note for this trip.
passengerGroups       | list of [PassengerGroup](#passengergroup)  | List of passenger groups that this trip covers. Will be one passenger group for private trips and one or more for pool trips.

## PassengerGroup

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
id                    | string                            | Unique id of this group.
bookingReference      | string                            | Booking reference of this group.
departureAt           | string                            | UTC timestamp of the departure date with time.
origin                | [Location](#location)             | Information about the origin location.
destination           | [Location](#location)             | Information about the destination location.
pickup                | [MapPoint](#mappoint)             | The pickup address/coordinates.
dropoff               | [MapPoint](#mappoint)             | The dropoff address/coordinates.
passengersCount       | integer                           | Count of passengers in this group.
leadPassengerName     | string                            | Name of the lead passenger.
leadPassengerPhone    | string                            | Phone of the lead passenger, including country code.
requestedChildSeats   | [ChildSeatsCounts](#childseats)   | Optional. Counts of requested child seats by type.
luggage               | [Luggage](#luggage)               | Counts of luggage per type.
customerNote          | string                            | Optional. Customer's note. Includes flight/train number.
driverNote            | string                            | Optional. Note for the driver.
cashPayment           | boolean                           | Specifies if this passenger group is paying in cash.
stops                 | list of [Stop](#stop)             | Sightseeing or custom stops.

## Location

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
name                  | string                            | Name of the location.
country               | string                            | Name of the country the location is in.

## MapPoint

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
address               | string                            | The pickup/dropoff address.
latitude              | number                            | Optional. Latitude in degrees, if provided.
longitude             | number                            | Optional. Longitude in degrees, if provided.

## ChildSeats

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
rearFacing            | integer                           | How many rear facing child seats were requested by this group.
forwardFacing         | integer                           | How many forward facing child seats were requested by this group.
boosterSeat           | integer                           | How many booster seats were requested by this group.
booster               | integer                           | How many boosters were requested by this group.

## Luggage

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
carryOns              | integer                           | Total count of carry ons for all passengers in this group.
suitcases             | integer                           | Total count of suitcases for all passengers in this group.

## Stop

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
name                  | string                            | Name of the stop.
durationInMinutes     | integer                           | Duration of the stop in minutes.
address               | [MapPoint](#mappoint)             | Address or coordinates of the stop location.
