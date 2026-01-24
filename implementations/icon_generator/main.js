const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { generateAppIconSet } = require('./utils/converter');

const CONFIG = {
  inputDir: path.join(__dirname, 'input'),
  outputDir: path.join(__dirname, 'output')
};

// Ask Question
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function run() {
  try {
    // Check Direct Path 
    const  directArg = process.argv[2];
    
    if (directArg) {
      const manualPath = path.resolve(directArg);
      if (fs.existsSync(manualPath) && path.extname(manualPath).toLowerCase() === '.svg') {
        console.log(`\nProcessing provided file: ${path.basename(manualPath)}`);
        await generateAppIconSet(manualPath, CONFIG.outputDir);
        console.log('Done.');
        return;
      } else {
        console.error('Error: File provided does not exist or is not an SVG.');
        return;
      }
    }

    // Check Directory
    if (!fs.existsSync(CONFIG.inputDir)) {
      fs.mkdirSync(CONFIG.inputDir);
      console.log('Created /input folder. Please place your SVG files there and run again.');
      return;
    }

    const files = fs.readdirSync(CONFIG.inputDir);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

    if (svgFiles.length === 0) {
      console.log('No SVG files found in /input folder.');
      return;
    }

    // File Pick
    console.log('\n--- SVG Selection ---');
    svgFiles.forEach((file, index) => {
      console.log(`[${index + 1}] ${file}`);
    });
    console.log(`[A] Process All`);
    console.log('---------------------');

    const answer = await askQuestion('Select a file number or "A" for all: ');
    const selection = answer.trim().toLowerCase();

    // Selection
    if (selection === 'a') {
      // All
      console.log('\nProcessing ALL files...');
      for (const file of svgFiles) {
        await generateAppIconSet(path.join(CONFIG.inputDir, file), CONFIG.outputDir);
      }
    } else {
      // Single Selection
      const index = parseInt(selection) - 1;
      if (index >= 0 && index < svgFiles.length) {
        const selectedFile = svgFiles[index];
        console.log(`\nProcessing: ${selectedFile}`);
        await generateAppIconSet(path.join(CONFIG.inputDir, selectedFile), CONFIG.outputDir);
      } else {
        console.log('Invalid selection. Exiting.');
        return;
      }
    }

    console.log('\n---------------------------------------------------');
    console.log('Success! Icons generated in /output');
    console.log('---------------------------------------------------');

  } catch (err) {
    console.error('Fatal Error:', err);
  }
}

run();