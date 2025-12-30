# React Native Calculator

A sleek, high-performance calculator built with React Native featuring smart logic, square root functions, and calculation history.

## Features

* **Square Root Function (`√`):** Supports square root logic. Automatically converts `√(` to `Math.sqrt(` for accurate mathematical evaluation.
* **Smart Parentheses:** Intelligently toggles between `(` and `)` based on bracket count and context. It also supports implicit multiplication (e.g., `5(` becomes `5*(` or `5√` becomes `5*√(`).
* **Input Length Guard:** Strictly limits input to **15 characters** to prevent display overflow and ensure UI stability.
* **Interactive History:** Stores the last 10 calculations at the top of the screen. Users can tap any history record to restore that value to the input field.
* **Smart Operator Replacement:** Prevents double operators (like `++`) by replacing the previous operator if a new one is pressed, while still allowing negative signs (e.g., `5*-2`).
* **Haptic Feedback:** Provides physical vibration feedback when the user attempts to exceed the character limit.
* **Auto-Formatting:** Automatically closes open brackets before calculation and removes unnecessary trailing zeros from results.

## Installation

1.  **Clone the project:**
    ```bash
    git clone [https://github.com/yourusername/calculator-app.git](https://github.com/yourusername/calculator-app.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the application:**
    ```bash
    # For Expo
    npx expo start
    
    # For Bare React Native
    npx react-native run-android 
    npx react-native run-ios
    ```

## Usage

* **C:** Clears the entire input and result.
* **⌫:** Deletes the last character.
* **√:** Calculates the square root of the following number or expression.
* **History Scroll:** Scroll through previous calculations at the top and tap one to use it again.

## Technical Implementation

The evaluation logic utilizes a sanitized string replacement method combined with the `Function` constructor:
- Percentage (`%`) is evaluated as `/100`.
- Square Root (`√`) is evaluated as `Math.sqrt()`.
- Results are limited to 8 decimal places using `toFixed(8)` to prevent floating-point errors.

## Project Structure

* `Calculator.js`: Main logic, history management, and button layout.
* `Display.js`: Responsive component for showing input and results.
* `Button.js`: Custom touchable component for the keypad.
* `styles.js`: Stylesheet for the dark-themed UI.