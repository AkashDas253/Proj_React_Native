# React Native Scientific Calculator

High-precision mathematical evaluation engine built with React Native 0.79, React 19, and the New Architecture (Fabric).

## Core Architecture

* **Rendering Engine:** Utilizes the New Architecture (Fabric) for high-performance UI updates and synchronous layout calculations.
* **Mathematical Logic:** Powered by `mathjs` configured with `BigNumber` at 64-bit precision to eliminate floating-point arithmetic errors.
* **State Management:** Implemented via `zustand` with persistence middleware for session-based history storage.
* **Orientation Logic:** Dynamic layout switching between Portrait (Standard) and Landscape (Scientific) using `expo-screen-orientation`.

## Technical Features

* **Implicit Multiplication:** Regex-based pre-processor handles expressions like `2π` or `(x)(y)` by injecting multiplication operators.
* **Trigonometric Normalization:** Automatic conversion of degree inputs to radians for standard trigonometric functions.
* **Advanced Evaluation:** Supports logarithms (`log10`, `ln`), absolute values, square roots, and exponentiation.
* **Input Sanitization:** Real-time character replacement for visual operators () into machine-readable syntax.
* **Haptic Integration:** Hardware-level tactile feedback via `expo-haptics` for keypress validation.

## Project Structure

* `App.js`: Application entry point and orientation provider.
* `src/screens/`: Layout logic for Portrait and Scientific modes.
* `src/store/`: Zustand store for input state and calculation history.
* `src/utils/mathLogic.js`: MathJS configuration and regex processing engine.
* `src/components/`: Atomic UI components (Buttons, Drawers).
* `src/constants/`: Centralized theme and layout variables.

## Installation

1. Install dependencies:
```bash
npm install

```


2. Build Development Client (Required for New Architecture/Skia):
```bash
npx eas build --platform android --profile development

```


3. Run the development server:
```bash
npx expo start

```



## Build Configuration

* **Babel:** Configured with `react-native-reanimated/plugin` for workletization.
* **Android:** `newArchEnabled` set to `true` in `app.json`.
* **Dependencies:** Uses `legacy-peer-deps` for React 19 compatibility across the ecosystem.

---