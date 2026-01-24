
# Icon Generator
 
A Node.js utility to convert SVG files into a complete set of PNG assets for **React Native**, **iOS**, **Android**, and **Web**. Powered by the `sharp` library for pixel-perfect scaling.

## Features

* **Interactive Picker**: Choose specific files to convert or process all at once.
* **React Native Ready**: Automatically generates `@2x` and `@3x` density sets.
* **App Store & Play Store**: Generates master icons (1024px and 512px).
* **Web Support**: Creates favicons and PWA-compliant icons.
* **No Quality Loss**: Renders directly from vector source to any size.

---

## Project Structure

```text
icon-generator/
├── input/           # Place your source .svg files here
├── output/          # Generated PNG sets appear here
├── utils/
│   └── converter.js # Image processing logic
├── main.js          # Interactive CLI entry point
└── package.json     # Dependencies

```

---

## Setup

1. **Install Dependencies**:
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install

```


2. **Add your Assets**:
Place your `.svg` files inside the `/input` folder.

---

## Usage

### Option 1: Interactive Menu (Recommended)

Run the script to see a list of available SVGs in your input folder:

```bash
node main.js

```

Follow the prompt to select a specific file (e.g., `1`) or process everything (`A`).

### Option 2: Direct Path

Skip the menu by passing the file path directly as an argument:

```bash
node main.js input/logo.svg

```

---

## Generated Assets
  
Each SVG will generate a folder in `/output` containing:
 
| File Name | Size (px) | Usage |
| --- | --- | --- |
| `ios-marketing.png` | 1024x1024 | App Store Connect |
| `android-playstore.png` | 512x512 | Google Play Console |
| `apple-touch-icon.png` | 180x180 | iOS Home Screen |
| `android-chrome-512.png` | 512x512 | Android Splash / PWA |
| `favicon-32.png` | 32x32 | Browser Tab |
| `favicon-16.png` | 16x16 | Browser Address Bar |

---

## Technical Note
 
This tool uses **Sharp**, which utilizes `libvips`. It is significantly faster than standard image processing libraries and handles SVG scaling without the typical "pixelation" found in canvas-based converters.

---
