const { spawn } = require('child_process');

const command = spawn('npx', ['migrate-mongo', 'up', '-f', 'migrations/migrate-mongo-config.js']);

command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

command.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
