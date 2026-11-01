#!/usr/bin/env bash
# Build the Cat Facts Android debug APK from a clean checkout.
# Run from the repo root.

set -euo pipefail

echo "==> Installing JS deps..."
npm install

echo "==> Building web app (dist/)..."
npm run build

echo "==> Syncing web assets into the Android project..."
npx cap sync android

echo "==> Building Android debug APK..."
(cd android && ./gradlew -q app:assembleDebug)

APK="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK" ]; then
  echo "==> APK built: $APK"
  ls -lh "$APK"
else
  echo "ERROR: APK not found at $APK" >&2
  exit 1
fi
