A multi-timer application.

## Screenshots

<img src="https://user-images.githubusercontent.com/5312427/150028321-51378628-619c-4e05-9147-0e3b5a6fcd07.png" width="320" alt="screenshot"> <img src="https://user-images.githubusercontent.com/5312427/150028326-c1396a22-033b-4551-bcba-4a13bdd1ee27.png" width="320" alt="screenshot">

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
