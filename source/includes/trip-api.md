# Trip API

A trip is a representation of passenger transportation from point A to point B. Each trip covers exactly one booking.

## Trips endpoint

> To search for all trips assigned to your company departing from the start of today onwards, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips"
  -H "x-api-key: your-api-key"
```

> To search for all trips with a departure time between two specified dates, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157"
  -H "x-api-key: your-api-key"
```

> To get the second page of results, use the following call:

```bash
curl "https://api.staging.mydaytrip.net/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157&pageIndex=1"
  -H "x-api-key: your-api-key"
```

> The same call against production, which needs a separate API key:

```bash
curl "https://api.mydaytrip.com/driver-company/v1/trips?departureTimeFrom=1679326157&departureTimeTo=1689326157"
  -H "x-api-key: your-production-api-key"
```

> The above calls return JSON structured like this:

```json
{
  "pageIndex": 0,
  "pageSize": 100,
  "tripsCount": 2,
  "nextPage": false,
  "trips": [
    {
      "id": "9ed90a6a-f09f-4843-b6ae-6f98859eb877",
      "type": "private",
      "vehicleType": "Sedan",
      "licensePlate": "654321",
      "vehicleModel": "3 Series station wagon",
      "englishSpeakingDriver": true,
      "departureAt": "2026-07-05T18:00:00.000Z",
      "departureAtUtc": "2026-07-05T16:00:00.000Z",
      "acceptationNote": "Fiat Tipo station wagon",
      "passengerGroups": [
        {
          "id": "11e4f50f-37cb-4f01-9d0d-9b76787a0dca",
          "bookingReference": "11E4F5",
          "departureAt": "2026-07-05T18:00:00.000Z",
          "departureAtUtc": "2026-07-05T16:00:00.000Z",
          "origin": {
            "name": "Prague",
            "country": "Czech Republic"
          },
          "destination": {
            "name": "Vienna",
            "country": "Austria"
          },
          "pickup": {
            "address": "Metropolitan Old Town hotel, Haštalská, Old Town, Czechia"
          },
          "dropoff": {
            "address": "Hotel Josefshof am Rathaus, Josefsgasse, Vienna, Austria"
          },
          "passengersCount": 3,
          "leadPassengerName": "Jan Novák",
          "leadPassengerPhone": "+420111111111",
          "luggage": {
            "carryOns": 2,
            "suitcases": 3
          },
          "requestedChildSeats": {
            "rearFacing": 0,
            "forwardFacing": 0,
            "boosterSeat": 0,
            "booster": 1
          },
          "driverNote": "For this trip, you must download the Daytrip Driver app and record the trip with the “Track a trip” button.",
          "customerNote": "We would like some non-sparkling water",
          "cashPayment": true
        }
      ],
      "stops": [
        {
          "name": "National Archeological Museum Chiusi",
          "durationInMinutes": 90,
          "address": {
            "address": "Via Porsenna, 93, 53043 Chiusi SI, Italy",
            "latitude": 43.0160062,
            "longitude": 11.9493061
          }
        }
      ]
    },
    {
      "id": "64071bc2-b0f8-48f0-a797-1a438eb01caa",
      "type": "private",
      "vehicleType": "Van",
      "licensePlate": "123456",
      "vehicleModel": "Mercedes-Benz Vito Tourer",
      "englishSpeakingDriver": true,
      "departureAt": "2026-07-05T18:00:00.000Z",
      "departureAtUtc": "2026-07-05T16:00:00.000Z",
      "acceptationNote": null,
      "passengerGroups": [
        {
          "id": "3919ca49-7153-4c50-b395-56bc026d30be",
          "bookingReference": "3919CA",
          "departureAt": "2026-07-05T18:00:00.000Z",
          "departureAtUtc": "2026-07-05T16:00:00.000Z",
          "origin": {
            "name": "Positano",
            "country": "Italy"
          },
          "destination": {
            "name": "Naples",
            "country": "Italy"
          },
          "pickup": {
            "address": "Villa Yiara, Viale Pasitea, Positano, SA, Italy",
            "latitude": 40.628749,
            "longitude": 14.4813395
          },
          "dropoff": {
            "address": "Naples Airport"
          },
          "passengersCount": 1,
          "leadPassengerName": "Jan Sokol",
          "leadPassengerPhone": "+420333333333",
          "luggage": {
            "carryOns": 1,
            "suitcases": 1
          },
          "requestedChildSeats": {
            "rearFacing": 0,
            "forwardFacing": 0,
            "boosterSeat": 0,
            "booster": 0
          },
          "customerNote": "I would like some sparkling water",
          "flightNumber": "FR1234",
          "cashPayment": true
        }
      ],
      "stops": []
    }
  ]
}
```

This endpoint returns all trips assigned to your company, split into pages when there are many. You can filter the trips by departure time. Trips are ordered by `departureAtUtc`, earliest first.

`passengerGroups` is a list, but today it always holds exactly one entry: a trip covers one booking. The list shape is left over from a shared-shuttle product that has been retired.

### URL path

`/driver-company/v1/trips`

### Query Parameters

Parameter           | Type    | Description
------------------- | ------- | -----------
departureTimeFrom   | integer | Earliest departure time to return, as a UNIX epoch timestamp in seconds. Matched against `departureAtUtc`. Defaults to the start of the current UTC day.
departureTimeTo     | integer | Latest departure time to return, as a UNIX epoch timestamp in seconds. Matched against `departureAtUtc`. When omitted, every trip departing after `departureTimeFrom` is returned.
pageIndex           | integer | Which page to return, counting from 0. Defaults to 0.
pageSize            | integer | How many trips per page. Defaults to 100. Larger pages are accepted, but they are slow.

<aside class="warning">
<code>departureTimeFrom</code> and <code>departureTimeTo</code> are matched
against <code>departureAtUtc</code>, which is genuine UTC. They are
<strong>not</strong> matched against <code>departureAt</code>, which is local
time at the pickup. The two fields do not use the same clock, so filtering by
a timestamp you read off <code>departureAt</code> will be wrong by that
location's UTC offset. See <a href="#departure-times">Departure times</a>.
</aside>

### Departure times

Every trip and every passenger group carries two departure timestamps.

**`departureAt` is the local wall-clock time at the pickup location.** It ends
in `Z`, which normally means UTC, but this value is not UTC. A trip leaving
Rome at 09:00 local time is sent as `2026-09-05T09:00:00.000Z`, even though
09:00 in Rome is 07:00 UTC. The field has behaved this way since the API
launched and is kept unchanged so that existing integrations keep working. If
all you need is the time to show a driver, read the clock face and ignore the
`Z`.

**`departureAtUtc` is the real UTC departure time** — `2026-09-05T07:00:00.000Z`
for that same Rome trip. Use it for anything that involves time arithmetic:
counting down to pickup, sorting, converting into another timezone, or
comparing against `departureTimeFrom` and `departureTimeTo`.

The offset between the two is the pickup location's UTC offset on that date,
so it changes with daylight saving — one hour in Italian winter, two in
summer.

### Response body

Property        | Type                              | Description
--------------- | --------------------------------- | -----------
pageIndex       | integer                           | Index of this page, counting from 0.
pageSize        | integer                           | The page size used for this request.
tripsCount      | integer                           | How many trips are on this page. Lower than `pageSize` on the last page.
nextPage        | boolean                           | Whether another page of results follows this one.
trips           | list of [Trip](#trip)             | The trips on this page, ordered by `departureAtUtc`, earliest first.

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
type                  | string                                     | Always `"private"`.
vehicleType           | string                                     | One of `"Sedan"`, `"Sedan Lite"`, `"MPV"`, `"MPV Lite"`, `"Van"`, `"Van Lite"`, `"Premium Van"`, `"Luxury Sedan"` or `"Shuttle"`, or `"Unknown"` when no vehicle is assigned yet. New values may be added — see [Compatibility](#compatibility).
licensePlate          | string                                     | Optional. License plate of the assigned vehicle, when one is assigned and has a plate on record.
vehicleModel          | string                                     | Optional. Model of the assigned vehicle, when one is assigned and we hold the information.
englishSpeakingDriver | boolean                                    | Always present. `false` on `"Sedan Lite"` trips, `true` on every other type.
departureAt           | string                                     | Local wall-clock departure time at the pickup location, despite the `Z` suffix. See [Departure times](#departure-times).
departureAtUtc        | string                                     | The genuine UTC departure time. Use this one for time arithmetic. See [Departure times](#departure-times).
acceptationNote       | string                                     | Optional. Note left by the company when it accepted the trip. Returned as `null` when a vehicle is assigned but carries no note.
passengerGroups       | list of [PassengerGroup](#passengergroup)  | The booking this trip covers. Always exactly one entry today; the list shape is left over from a retired shared-shuttle product.
stops                 | list of [Stop](#stop)                      | Sightseeing or custom stops. An empty list when there are none.

## PassengerGroup

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
id                    | string                            | Unique id of this group, which is also the Daytrip order id. Quote it to support when asking about a specific booking.
bookingReference      | string                            | Booking reference of this group.
departureAt           | string                            | Local wall-clock departure time at the pickup location. The same value as the trip's `departureAt`. See [Departure times](#departure-times).
departureAtUtc        | string                            | The genuine UTC departure time. The same value as the trip's `departureAtUtc`.
origin                | [Location](#location)             | The origin location.
destination           | [Location](#location)             | The destination location.
pickup                | [MapPoint](#mappoint)             | Where to collect the passengers.
dropoff               | [MapPoint](#mappoint)             | Where to drop the passengers off.
passengersCount       | integer                           | How many passengers are in this group.
leadPassengerName     | string                            | Name of the lead passenger.
leadPassengerPhone    | string                            | Optional. Phone number of the lead passenger including country code, when we hold one.
luggage               | [Luggage](#luggage)               | Always present. Luggage counts per type.
requestedChildSeats   | [ChildSeats](#childseats)         | Always present. How many child seats of each type were requested; every count is 0 when none were.
driverNote            | string                            | Optional. Note for the driver.
customerNote          | string                            | Optional. Free text written by the customer. Use `flightNumber` for the flight number. A ship or train name, when the customer gives one at all, appears here or in `driverNote` as free text; we do not hold it as a separate field.
flightNumber          | string                            | Optional. The flight number for this booking, when the customer supplied one. The key is absent when there is none.
cashPayment           | boolean                           | Whether this passenger group pays the driver in cash.

## Location

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
name                  | string                            | Name of the location.
country               | string                            | Name of the country the location is in.

## MapPoint

Property              | Type                              | Description
--------------------- | --------------------------------- | -----------
address               | string                            | The address as text.
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
