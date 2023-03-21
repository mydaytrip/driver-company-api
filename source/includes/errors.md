# Errors

Daytrip uses conventional HTTP response codes to indicate the success or failure of an API request. In general: codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, no trip was found for given parameters, etc.). Codes in the 5xx range indicate an error with Daytrip's servers (these are rare).

HTTP Code | Meaning
---------- | -------
400        | Bad Request - Missing mandatory parameters, wrong types of parameters or not a valid json.
401        | Unauthorized - API key is missing or invalid.
403        | Forbidden - The requested operation is forbidden.
404        | Not Found - You are likely calling an URL that doesn't exist.
500        | Internal Server Error - We had a problem with our service. Please retry your request.
503        | Service Unavailable - We had a problem with our service. Please retry your request.
