const fs = require('fs');

console.log('Please input text to file:');
let writeableStream = fs.createWriteStream('./02-write-file/text.txt');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'exit': 
      rl.close();
      break;
    default:
      writeableStream.write(line.trim() + '\n');
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a nice day!');
  writeableStream.end('');
  process.exit(0);
});