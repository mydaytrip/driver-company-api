# Changelog

Changes to the Daytrip driver company API, newest first.

## 2026-09 — UTC departure time and flight number

- Added `departureAtUtc` to the trip and to every passenger group. This is the
  genuine UTC departure time. The existing `departureAt` is unchanged: it stays
  the local wall-clock time at the pickup location.
- Added `flightNumber` to the passenger group, present when the booking has one.

Documentation corrections shipped at the same time, with no change to API
behaviour:

- `departureAt` is now documented as local pickup time rather than UTC, and the
  new [Departure times](#departure-times) section explains which field the
  `departureTimeFrom` and `departureTimeTo` filters use.
- The trip count field is documented under the name the API actually returns,
  `tripsCount`. It was previously listed as `tripCount`.
- The `vehicleType` list now matches the values the API can send.
- `type` is documented as always `"private"`.
- `passengerGroups` is documented as always holding exactly one entry. The old
  docs described trips shared between several bookings, which this API has not
  returned since the shared-shuttle product was retired.
- The example responses are now valid JSON and a production example was added.
- The [Compatibility](#compatibility) section above is new.

## Before September 2026

Not recorded. The `/driver-company/v1` path has not changed since launch.
