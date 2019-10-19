# parkdude-mobile-client

## Setup instructions

### Required:
- install Node.js version LTS 10.0 or greater
- install Expo CLI ```npm install -g expo-cli```
- download Expo mobile app from Google play / App store
- install ESLint (and optionally Prettier) extension for code editor (VSCode for example)

### Build & run:
- clone this repository
- ```cd parkdude-mobile-client```
- ```npm install```

- run application on mobile: ```expo start```

### Tests:
- Jest is used for testing the application
- run tests: ```npm test```

### Android:
- Running application opens Metro Bundler in a browser window.
- If your mobile device is in same local network select connection type "LAN" otherwise change the connection type to "Tunnel"
- Open Expo app on your mobile device and navigate to "Projects" view.
- Scan the QR code and parkdude-mobile-client app should open in the Expo mobile app.

### iOS:
- Running application opens Metro Bundler in a browser window. 
- The given QR-code needs to be scanned with iOS camera application. 
- The parkdude-mobile-client application will open up in the Expo mobile app.


