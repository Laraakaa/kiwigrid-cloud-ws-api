# Websocket Protocol

## getDevices

### Request example

```json
{
  "type": "send",
  "address": "deviceservice",
  "replyAddress": "replyAddress",
  "body": {
    "accessToken": "accessToken",
    "action": "getDevices",
    "params": {
      "filter": { "deviceModel.deviceClass": "com.kiwigrid.devices.location.Location" },
      "projection": { "tagValues": { "AddressLocation": 1 } }
    }
  }
}
```

### Response example

```json
{
  "data": {
    "address": "replyAddress",
    "body": {
      "status": "ok",
      "result": {
        "offset": 0,
        "limit": 50,
        "total": 1,
        "items": [
          {
            "guid": "urn:kiwigrid:location:LOCATION",
            "tagValues": {
              "AddressLocation": {
                "tagName": "AddressLocation",
                "guid": "urn:kiwigrid:location:LOCATION",
                "value": { "zip": "ZIP_CODE", "country": "COUNTRY_CODE", "city": "CITY_NAME" },
                "timestamp": 1519220217,
                "oca": 1
              }
            }
          }
        ]
      },
      "code": 200,
      "message": "ok"
    }
  }
}
```
