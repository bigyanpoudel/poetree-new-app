# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

##Production APK
###eas build --platform android

##For building apk
eas build -p android --profile preview

##Start dev server
npx expo start --dev-client

##Development app
eas build --profile development --platform android


### Setup to run project in development

1. Intall  expo, eas and  the packages 
```
yarn add expo
npm install -g eas-cli
yarn
```
2. Start expo server in android emulator
```
expo start
```
For expo to start we must have the android emulatar installed with in the system

3. Build the dev server app to debug in local device

a. Build the app using the command

```
eas build --profile development --platform android
```
This command will build the app in th expo store

b. Download the built app from the expo store into the real device

c. Run the project
```
npx expo start --dev-client

```

d. Open the installed dev app and you can scan the QR or you can use the URL to access the project in development##Production APK
###eas build --platform android

##For building apk
eas build -p android --profile preview

##Start dev server
npx expo start --dev-client

##Development app
eas build --profile development --platform android


### Setup to run project in development

1. Intall  expo, eas and  the packages 
```
yarn add expo
npm install -g eas-cli
yarn
```
2. Start expo server in android emulator
```
expo start
```
For expo to start we must have the android emulatar installed with in the system

3. Build the dev server app to debug in local device

a. Build the app using the command

```
eas build --profile development --platform android
```
This command will build the app in th expo store

b. Download the built app from the expo store into the real device

c. Run the project
```
npx expo start --dev-client

```

d. Open the installed dev app and you can scan the QR or you can use the URL to access the project in development


eas build --platform android --local