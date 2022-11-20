A multi-timer and chrono application. The essential chef tool.

<a href="https://apps.apple.com/es/app/kitchendoro/id1607064139"><img src="https://user-images.githubusercontent.com/5312427/158222269-ce4548cd-a462-44ff-8d49-6925328dbd40.svg" height="40" alt="Download on the Apple Store" /></a> <a href="https://play.google.com/store/apps/details?id=com.multitimer"><img src="https://user-images.githubusercontent.com/5312427/158222275-11ce2126-cb8f-4dfc-b415-812cfd5a75bd.svg" height="40" alt="Get it on Google Play" /></a>

## Features:

- Notifications with sounds.
- Prevent screen from locking.
- Still working in background.
- Multilanguage support: English and Spanish.

## Screenshots

<img src="https://user-images.githubusercontent.com/5312427/155002280-5dd4e52d-de7e-4a55-923e-2606a2aa71b5.png" width="250" alt="Timers page">
<img src="https://user-images.githubusercontent.com/5312427/155001752-7d191991-a2e2-4996-9c0f-316ad0a6110b.png" width="250" alt="Chrono page">

## Installation

Download and install the libraries:
```bash
git clone https://github.com/gchumillas/kitchendoro
cd kitchendoro
yarn
```

And run the app into the iOS or Android simulators:
```bash
yarn iOS     # run the app in the iOS simualtor [OR]
yarn Android # run the app in the Android emulator
```

Once the app is installed into the simulator, you can start the Expo server and reopen the app to refresh it:
```bash
yarn start
```

## Directory Structure

```
android -- Android app
ios     -- iOS app
assets  -- Images, icons, etc.
src     -- Source code files
  components -- Shareable components
    app      -- App specific components [1]
  i18n       -- Translations
  layouts    -- Page layouts
  libs       -- Libraries
  pages      -- Pages [2]
  providers  -- Providers [3]
  store      -- Redux store
index.js     -- Entry point
```

- [1] Some components can be reused in other applications, such as text fields, radio buttons, etc. And others don't. The `src/components/app` folder contains the components that are "app specific".
- [2] A "page" is a special type of component used to present "pages". These components are registered in the routing system (see [App.js](/src/App.js)).
- [3] A "provider" is any function that sends or gets information from an asynchronous resource, such as the System Cache or an external API.

## Relevant libraries

- [@expo-google-fonts](https://github.com/expo/google-fonts): Amazing list of Google Fonts ready to use from your React Native app.
- [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/): Easy to use internationalization library.
- [react-native-svg](https://github.com/react-native-svg/react-native-svg): Add SVG support to your React Native projects.
- [redux](https://redux.js.org/) and [react-redux](https://react-redux.js.org/): Popular library to manage global state variables.
- [react-router-native](https://reactrouter.com/en/v6.3.0/api): Add routing capabilities to your native app.
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/): Manage System Cache keys.
- [expo-keep-awake](https://docs.expo.dev/versions/latest/sdk/keep-awake/): Keep your screen always awake.
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/): Manage push notifications.
- [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn): TailwindCSS for React Native applications.

## Useful command lines

```bash
# compile and execute the app into iOS simulator
yarn ios

# compile and execute the app into Android emulator
yarn android
```

```bash
# run ESLint to detect style guide inconsistencies,
# syntax errors, or problematic patterns in the source code
yarn lint 
```

```bash
# run Expo server to start and debug the app
yarn start
```

## Development

```bash
# generates tailwind.json based on tailwind.config.js
yarn tw:build
```
