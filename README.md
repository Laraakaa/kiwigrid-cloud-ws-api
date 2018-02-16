# kiwigrid-cloud-ws-api

API for Kiwigrid.com cloud using websockets. This API allows you to get information about your PV/Battery. You can read everything you can read in your Energy-Manager.

## Attention:

This API is unofficial and not supported. So you should not use it if you have to really trust it. Although, you are free to use it "for fun", e.g. to display your current battery status in an embedded system or on your website.

## Authorization

Authorization is handled by the API. You just have to submit your Energy-Manager username and password.

### In-Depth

#### 1. Submit username and password, receive session_id (cookie)
```
POST https://auth.energy-manager.de/login
Content-Type: application/x-www-form-urlencoded
```

| Key | Value |
| --- | --- |
| username | Your EnergyManager Portal Username |
| password | Your EnergyManager Portal Password |
| autologin | false |
| channel | solarwatt |
| originalRequest | /authorize?response_type=code&amp;redirect_uri=https%3A%2F%2Fdesktop.energy-manager.de%2Frest%2Fauth%2Fauth_grant&amp;state=&amp;client_id=kiwigrid.desktop&amp;overrideRedirectUri=true |

Which gets us a session_id:
```
Set-Cookie session_id=[session_id_cookie];

{"redirectUri":"/authorize?response_type=code&amp;state=&amp;client_id=kiwigrid.desktop&amp;overrideRedirectUri=true&amp;redirect_uri=https%3A%2F%2Fdesktop.energy-manager.de%2Frest%2Fauth%2Fauth_grant"}
```

#### 2. Hit the /authorize endpoint
```
GET https://auth.energy-manager.de/authorize?response_type=code&amp;state=&amp;client_id=kiwigrid.desktop&amp;overrideRedirectUri=true&amp;redirect_uri=https%3A%2F%2Fdesktop.energy-manager.de%2Frest%2Fauth%2Fauth_grant
Cookie: session_id=[session_id from before]
```

Which should anwer with a redirect to the /rest/auth/auth_grant endpoint (including a secret code):
```
Location: https://desktop.energy-manager.de/rest/auth/auth_grant?code=secretCode
```

#### 3. Hit the /rest/auth/auth_grant endpoint
```
GET https://desktop.energy-manager.de/rest/auth/auth_grant?code=secretCode
```

Which should return a webcore_sid cookie and redirect to /index.html:
```
Set-Cookie webcore_sid=[webcore_sid_cookie];
Location: http://desktop.energy-manager.de/index.html
```

#### 4. Get an accessToken from /js/context.js
```
GET https://desktop.energy-manager.de/js/context.js
Cookie: webcore_sid=[webcore_sid_cookie]
```
Which should return some javascript that can be parsed. The accessToken will be stored and used to establish a connection to the websocket.

## Documentation

Start of by creating a new Instance of KiwigridApi:

```javascript
const KiwigridApi = require('kiwigrid-cloud-ws-api');
```
