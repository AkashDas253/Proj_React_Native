# React Native Expo Project

This is a React Native project built with Expo. It provides a modern and flexible structure for developing cross-platform mobile applications.

## Project Structure

```
code/
├── app.json                # Expo configuration file
├── package.json            # Project dependencies and scripts
├── app/                    # Application screens and layouts
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── explore.tsx
│       └── index.tsx
├── assets/                 # Static assets (images, fonts, etc.)
│   ├── fonts/
│   └── images/
├── components/             # Reusable UI components
├── constants/              # Application constants
├── hooks/                  # Custom React hooks
├── scripts/                # Utility scripts
```

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites
- Node.js installed on your system
- Expo CLI installed globally (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd code
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the Expo development server:
   ```bash
   npx expo start
   ```
2. Use the Expo Go app on your mobile device to scan the QR code or run the app on an emulator/simulator.

## Project Features
- Cross-platform support (iOS, Android, and Web)
- Modular and reusable components
- Custom hooks for shared logic

## Technologies and Features Used

- **Expo**: For building and running the React Native app.
- **React Native**: For cross-platform mobile app development.
- **JavaScript**: For building the application.
- **Custom Hooks**: To encapsulate reusable logic.
- **Reusable Components**: Modular and maintainable UI components.
- **Static Assets**: Organized structure for images and fonts.
- **Scripts**: Utility scripts for project maintenance.

## Folder Details
- **app/**: Contains the main application screens and layouts.
- **assets/**: Includes static assets like images and fonts.
- **components/**: Houses reusable UI components.
- **constants/**: Stores application-wide constants.
- **hooks/**: Contains custom React hooks.
- **scripts/**: Utility scripts for project maintenance.

## License
This project is licensed under the MIT License.