const { spawn } = require('child_process');

const keywordExtract = (bio, readmes) => {
    return new Promise((res, _) => {
        const bigReadme = readmes.join('')
        const python = spawn('python', ['./script.py', bio, bigReadme]);

        python.stdout.on('data', (data) => {
            res(JSON.parse(data));
        });
    })
}

module.exports = keywordExtract;