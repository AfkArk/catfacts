# Cat Facts 🐱

A simple app that pulls a random cat fact from [catfact.ninja](https://catfact.ninja), with a refresh button and a favorite tab that keeps your favorites in local storage.

Built with React + Vite.

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Android APK

There's also an Android app shell (Capacitor) in `android/`. To build the
debug APK:

```bash
./build-android.sh
```

You need Java 21 and an Android SDK (see `android/README.md`). The APK comes
out at `android/app/build/outputs/apk/debug/app-debug.apk` (package
`com.afkark.catfacts`, label "Cat Facts", v1.0).

A debug APK is already built and sitting at the repo root as
`CatFacts-debug.apk`. To install it on Android, transfer the file to the
phone and tap it to install (allow "Install from this source" if prompted).

## License

MIT
