## Hello World: A Simple Project in React Native and Expo

---

### Phase 1: Creation & Environment

Use these commands in your Windows **Command Prompt (CMD)** to initialize a healthy project.

| Action | Command | Why? |
| --- | --- | --- |
| **Install Build Tools** | `npm install -g eas-cli` | Global requirement for cloud builds. |
| **Create Project** | `npx create-expo-app@latest hello-world` | Uses the most stable 2025 template. |
| **Navigate** | `cd hello-world` | Must be inside the folder to run commands. |
| **Health Check** | `npx expo-doctor` | Checks for configuration errors before you start. |
| **Update Libraries** | `npx expo install --fix` | Syncs all packages to your specific Expo version. |

---

### Phase 2: Professional Configuration

These are the two "Brains" of your project. Copy these exactly into your files.

#### `app.json` (The Identity)

If you encounter a "Project ID mismatch" error, delete the `extra` block entirely.

```json
{
  "expo": {
    "name": "Hello World",
    "slug": "hello-world",
    "version": "1.0.0",
    "scheme": "helloworld",
    "userInterfaceStyle": "automatic",
    "android": {
      "package": "com.yourname.helloworld",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "ios": {
      "bundleIdentifier": "com.yourname.helloworld",
      "supportsTablet": true
    }
  }
}

```

#### `eas.json` (The Professional Version)

This version includes **auto-incrementing** version codes so you never get "Duplicate Version" errors.

```json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}

```

---

### Phase 3: The Build & Install Workflow

Follow these steps to move from code to a physical app on your phone.

#### 1. Trigger the Build

```cmd
eas login
eas build:configure
eas build --platform android --profile preview

```

#### 2. Handle the Terminal Prompts

* **Link to Project?** → Type **Y** (Creates the cloud project).
* **Generate Keystore?** → Type **Y** (Saves your security keys to Expo).

#### 3. Installation Methods

Once the build is "Finished" in your terminal:

* **Physical Device:** Scan the **QR Code** shown in the terminal. Tap the link, download the APK, and select **"Install Anyway"** when prompted.
* **Android Emulator:** The terminal will ask: *"Install on Android Emulator?"*. Press **Y**.
* **Direct via USB:** If your phone is plugged in, download the APK and run:
```cmd
adb install your-app-filename.apk

```



---

### Phase 4: Maintenance & "Over-the-Air" Updates

Once the app is installed, you can fix bugs **without** making a new build.

| Step | Command | Result |
| --- | --- | --- |
| **Configure Updates** | `eas update:configure` | Sets up the instant update system. |
| **Push a Hotfix** | `eas update --branch preview` | Code changes appear in your app instantly. |
| **Clear Cache** | `npx expo start -c` | Fixes "Strange behavior" or build crashes. |
| **Check Version** | `eas build:version:set` | Manually reset or check your cloud version code. |

---

### Troubleshooting Cheat Sheet

* **"Project ID Mismatch":** Delete `extra.eas.projectId` from `app.json` and restart the build.
* **"App not installed":** You likely have an older version with the same ID on your phone. **Uninstall the old app first.**
* **"Gradle Error":** Run `npx expo-doctor` and follow the advice. Usually, it's a version mismatch fixed by `npx expo install --fix`.
