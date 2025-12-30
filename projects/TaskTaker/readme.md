
# TaskTaker 

TaskTaker is a modern, lightweight, and performant Task Management application built with **React Native** and **Expo**. It features a clean card-based UI, persistent local storage, and real-time task filtering.

---

## Features

* **Full CRUD Functionality**: Create, Read, Update, and Delete tasks seamlessly.
* **Task Completion**: Toggle tasks as "Done" with a visual strikethrough and opacity effect.
* **Smart Filtering**: Quickly switch between **All**, **Active**, and **Completed** views.
* **Persistent Storage**: Integrated with `@react-native-async-storage/async-storage` so your tasks remain even after closing the app.
* **Modern UI/UX**: 
    * Responsive design using `SafeAreaView`.
    * Keyboard handling with `KeyboardAvoidingView`.
    * Card-based layout with subtle shadows and transitions.
    * Clean iconography via `Feather` (Vector Icons).
* **Timestamping**: Automatically tracks the date each task was created.

---

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (Feather set)
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)

---

## Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/tasktaker.git](https://github.com/yourusername/tasktaker.git)
    cd tasktaker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Install Required Expo Libraries**
    ```bash
    npx expo install @react-native-async-storage/async-storage react-native-vector-icons
    ```

4.  **Start the project**
    ```bash
    npx expo start
    ```

5.  **Run on your device**
    * Scan the QR code with the **Expo Go** app (Android/iOS).
    * Press `a` for Android Emulator or `i` for iOS Simulator.

---

## Project Structure

```text
├── App.js                 # Main application logic & state
├── components/
│   ├── TaskInput.js       # Text input and Add/Update button logic
│   ├── TaskList.js        # FlatList container for rendering tasks
│   └── TaskItem.js        # Individual task card component
└── assets/                # App icons and splash screens

```

---

## Usage

* **Add a Task**: Type in the input field and tap the `+` button.
* **Edit**: Tap the blue edit icon on an active task to load it back into the input field.
* **Complete**: Tap the circle icon on the left of any task to toggle its status.
* **Delete**: Tap the red trash icon to remove a task permanently.
* **Filter**: Use the top toggle bar to filter tasks by their current status.

---

## License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

---