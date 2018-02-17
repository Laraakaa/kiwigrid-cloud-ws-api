const request = require('request');

const config = {
  login: 'https://auth.energy-manager.de/login',
  getPayload: (username, password) => {
    return (
      'username=' +
      username +
      '&password=' +
      password +
      '&autologin=false&channel=solarwatt&originalRequest=%2Fauthorize%3Fresponse_type%3Dcode%26amp%3Bredirect_uri%3Dhttps%253A%252F%252Fdesktop.energy-manager.de%252Frest%252Fauth%252Fauth_grant%26amp%3Bstate%3D%26amp%3Bclient_id%3Dkiwigrid.desktop%26amp%3BoverrideRedirectUri%3Dtrue'
    );
  },
  authorize:
    'https://auth.energy-manager.de/authorize?response_type=code&amp;state=&amp;client_id=kiwigrid.desktop&amp;overrideRedirectUri=true&amp;redirect_uri=https%3A%2F%2Fdesktop.energy-manager.de%2Frest%2Fauth%2Fauth_grant',
  context: 'https://desktop.energy-manager.de/js/context.js'
};

class Authentication {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getSessionID() {
    return new Promise(resolve => {
      console.log('Authenticating for user ' + this.username);
      const formData = config.getPayload(this.username, this.password);
      request.post(
        config.login,
        {
          form: formData
        },
        (error, response, body) => {
          if (response.statusCode == 200) {
            resolve(response.headers['set-cookie'][1]);
          }
        }
      );
    });
  }

  authorize(sessionId) {
    return new Promise((resolve, reject) => {
      console.log('Authorizing for user ' + this.username);
      request.get(
        config.authorize,
        {
          followRedirect: false,
          headers: { Cookie: sessionId }
        },
        (error, response, body) => {
          if (response.statusCode == 302) {
            resolve(response.headers['location']);
          }
        }
      );
    });
  }

  grantAuth(grantUrl) {
    return new Promise(resolve => {
      console.log('Granting auth for ' + this.username);
      request.get(
        grantUrl,
        {
          followRedirect: false
        },
        (error, response, body) => {
          if (response.statusCode == 307) {
            resolve(response.headers['set-cookie'][0]);
          }
        }
      );
    });
  }

  getAccessToken(sidCookie) {
    return new Promise(resolve => {
      console.log('Reading access token for ' + this.username);
      request.get(
        config.context,
        {
          headers: { Cookie: sidCookie }
        },
        (error, response, body) => {
          if (response.statusCode == 200) {
            resolve(
              body
                .split('\n')
                .filter(line => line.trim().startsWith('accessToken: '))[0]
                .trim()
                .replace(/accessToken: '/, '')
                .replace(/',/, '')
            );
          }
        }
      );
    });
  }
}

module.exports = Authentication;
