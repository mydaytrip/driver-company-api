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

```

This endpoint returns all trips assigned to your company. You can filter the trips by departure time.

### URL path

`/driver-company/v1/trips`

### Query Parameters

Parameter           | Type    | Description
------------------- | ------- | -----------
departureTimeFrom   | integer | Minimum departure time as a UNIX epoch timestamp in seconds. If not provided it will default to start of current day.
departureTimeTo     | integer | Maximum departure time as a UNIX epoch timestamp in seconds. If not provided then no maximum filter will be applied and every future trip after `departureTimeFrom` will be returned.
pageIndex           | integer | Page index to return. Will default to 0.

### Response body

Property        | Type                              | Description
--------------- | --------------------------------- | -----------
pageIndex       | integer                           | Page index of this result section, starting from 0.
pageSize        | integer                           | Size of each page.
tripCount       | integer                           | Actual count of trips on this page, can be lower than `pageSize` for the last page.
nextPage        | boolean                           | Specifies if there is a next page with results after this one.
trip            | list of Trip                      | List of trips on this page.

### Error status codes

Status code | Description
----------- | -----------
400         | Invalid request - missing mandatory query parameter, parameter has wrong type or wrong passenger count.
401         | API key missing or invalid.
