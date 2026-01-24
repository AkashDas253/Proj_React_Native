const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateAppIconSet(inputFilePath, outputDir) {
  const fileName = path.basename(inputFilePath, '.svg');
  
  // Sizes
  const iconSpecs = [
    { name: 'ios-marketing', size: 1024 },      // App Store Master
    { name: 'android-playstore', size: 512 },   // Google Play Master
    { name: 'apple-touch-icon', size: 180 },    // iOS Home Screen Web Clip
    { name: 'android-chrome-512', size: 512 },  // PWA / Android Splash
    { name: 'android-chrome-192', size: 192 },  // PWA Home Screen
    { name: 'favicon-32', size: 32 },           // Desktop Browser Tab
    { name: 'favicon-16', size: 16 }            // Address Bar
  ];

  // Create sub-folder
  const setDir = path.join(outputDir, fileName);
  if (!fs.existsSync(setDir)) {
    fs.mkdirSync(setDir, { recursive: true });
  }

  console.log(`\nGenerating icons for: ${fileName}`);

  // Generate in parallel
  const tasks = iconSpecs.map(spec => {
    const targetPath = path.join(setDir, `${spec.name}.png`);
    return sharp(inputFilePath)
      .resize(spec.size, spec.size)
      .png()
      .toFile(targetPath)
      .then(() => console.log(`  ✓ Created ${spec.name} (${spec.size}x${spec.size})`));
  });

  return Promise.all(tasks);
}

module.exports = { generateAppIconSet };