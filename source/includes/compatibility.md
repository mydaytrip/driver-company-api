# Compatibility

We add to this API without changing what is already there. Please build your
integration to tolerate the following.

**We may add new fields** to any response object, at any time, without notice.
Ignore fields you do not recognise. In particular, do not configure your JSON
parser to reject unknown properties — that means `FAIL_ON_UNKNOWN_PROPERTIES`
in Jackson, `MissingMemberHandling.Error` in .NET, and strict schema modes in
most validation libraries.

**We may add new values** to any field documented with a list of values, such
as `vehicleType`. Handle a value you do not recognise gracefully rather than
rejecting the whole response.

**We may add new optional query parameters.** Existing ones keep their meaning.

**We will not** rename or remove a field you receive today, change its type, or
change what its value means. If that ever becomes necessary, it will happen on
a new version path and you will hear from us first.

One thing that is not a promise: `pageSize` currently accepts any value, but
large pages are slow for both of us and we may introduce a limit.

Changes are recorded in the [Changelog](#changelog) at the end of this page.
