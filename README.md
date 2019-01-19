## Exposed API

1. `GET /temperatures?start=2018-08-01T00:00:00Z&end=2018-08-07T00:00:00Z`
2. `GET /speeds?start=2018-08-01T00:00:00Z&end=2018-08-04T00:00:00Z`
3. `GET /weather?start=2018-08-01T00:00:00Z&end=2018-08-04T00:00:00Z`

# Considerations

* I put a limit to parallel calls to 1000 (WeatherService.ts) per service so backend services won't overload. This limit is per request, so there may be more than 1000 request at a time per service.
* I cache result in memory as soon as I have a result. This can be improved and I can cache as long as a request is perfomed so there won't be more than one request at a time requesting same data.
With this approach I should consider what to do with errors (retry n time for instance).