
# React Native + Expo: Initialization

This directory contains the clean, boilerplate setup for **React Native** development using the **Expo** ecosystem. It is optimized for rapid practice and learning mobile UI patterns.

## Project Structure

```text
basics/rn_initialization/
├── code/
│   ├── App.js            # Main entry point
│   ├── app.json          # Expo configuration (App name, icon, splash)
│   ├── package.json      # Scripts and dependencies
│   ├── assets/           # Splash screens and app icons
│   └── .gitignore        # Native-specific ignore rules
└── README.md             # Mobile setup guide

```

---

## Quick Start

### 1. Install Dependencies

Navigate to the code directory and install the necessary packages:

```bash
cd basics/rn_initialization/code
npm install

```

### 2. Launch the Development Server

Expo uses a dev server to "stream" the code to your device or emulator:

```bash
npx expo start

```

### 3. Connect a Device

* **Physical Device:** Install the **Expo Go** app (iOS/Android) and scan the QR code.
* **Android Emulator:** Press **`a`** in the terminal.
* **iOS Simulator:** Press **`i`** in the terminal.

---

## Cleanup & Optimization

The default Expo template was modified for a "clean slate" experience:

* [x] Removed default styling boilerplate from `App.js`.
* [x] Configured `app.json` for a clean project naming convention.
* [x] Standardized `Flexbox` centering in the root view.
* [x] Verified `.expo` and `node_modules` are excluded from Git.

---

## Clean Starter Snippet (`App.js`)

Use this minimal code to start any new mobile feature.

```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>React Native Starter Active</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

---

## Essential Expo Commands

| Command | Purpose |
| --- | --- |
| `npx expo start` | Starts the Metro Bundler |
| `npx expo start -c` | Clears the packager cache (fix glitches) |
| `npx expo install <pkg>` | Installs libraries compatible with your Expo version |
| `npx expo login` | Links your local machine to your Expo account |

---

## Key Differences from React Web

* **No HTML tags:** Use `<View>` instead of `<div>` and `<Text>` instead of `<p>`.
* **Styling:** Mobile uses a subset of CSS (all properties are `camelCase`).
* **Flexbox:** `flexDirection` defaults to `column` on mobile (unlike `row` on web).

---
