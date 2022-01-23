A multi-timer application.

## Screenshots

<img src="https://user-images.githubusercontent.com/5312427/150701665-46a97ae0-db68-438f-a037-a0068cce2ebd.png" width="320" alt="screenshot 1"> <img src="https://user-images.githubusercontent.com/5312427/150701664-229df631-cb2e-4947-b4b8-34e376704235.png" width="320" alt="screenshot 2">

## Test the application

```bash
# install libraries
yarn

# run in iOS
yarn ios

# alternatively you can run it on Android
yarn android
```

## Development

```bash
# generates tailwind.json based on tailwind.config.js
npx create-tailwind-rn && cp styles.json tailwind.json && rm styles.json
```
