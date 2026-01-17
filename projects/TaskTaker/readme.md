
# TaskTaker

TaskTaker is a modern, lightweight Task Management application built with **React Native** and **Expo**. It features a separated logic architecture (Custom Hooks), persistent local storage, and a native **Alarm/Notification system** for time-sensitive tasks.

---

## Features

* **Custom Hook Logic**: Logic is decoupled from the UI using `useTaskManager` for better maintainability.
* **Smart Alarms**: Set local notifications for specific dates and times using a multi-step native picker.
* **Full CRUD Functionality**: Create, Read, Update, and Delete tasks seamlessly.
* **Task Completion**: Toggle tasks as "Done" with visual feedback and automatic sorting.
* **Persistent Storage**: Powered by `@react-native-async-storage/async-storage` to keep data safe across reboots.
* **Modern UI/UX**:
* Responsive Card-based layout with `Feather` icons.
* Real-time task filtering (**All**, **Active**, **Completed**).
* Sorting logic that prioritizes upcoming alarms.



---

## Tech Stack

* **Framework**: [Expo SDK 52+](https://expo.dev/)
* **Alarms**: [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
* **Pickers**: [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)
* **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
* **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tasktaker.git
cd tasktaker

```


2. **Install dependencies**
```bash
npm install

```


3. **Install Native Modules**
```bash
npx expo install @react-native-async-storage/async-storage expo-notifications expo-device @react-native-community/datetimepicker

```


4. **Start the project**
```bash
npx expo start

```



---

## Project Structure

```text
├── App.js                 # UI Entry point & Main View
├── hooks/
│   └── useTaskManager.js  # Business logic, Storage & Notification engine
├── components/
│   ├── TaskInput.js       # Task creation with Date/Time picker logic
│   ├── TaskList.js        # Optimized list container
│   └── TaskItem.js        # Individual card with alarm display
└── assets/                # Branding and icons

```

---

## Usage

* **Set an Alarm**: Tap the 🔔/📅 icon while adding a task. On Android, pick the date first, and the time picker will automatically follow.
* **Filtering**: Use the status bar to toggle between active and finished tasks.
* **Sorting**: Tasks with upcoming alarms are automatically moved to the top of your "Active" list.
* **Notifications**: The app will trigger a system alert even if the app is in the background (Requires a physical device or Development Build for full reliability).

---

## Building for Production (APK)

To generate a standalone Android APK, ensure you have `eas-cli` installed and run:

```bash
eas build -p android --profile preview

```

---
