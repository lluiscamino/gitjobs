const {PythonShell} = require('python-shell')

const keywordExtract = (bio, readmes) => {
    return new Promise((res, _) => {
        const bigReadme = readmes.join('')

        PythonShell.run('script.py',{args: [bio,bigReadme]}, (err,results) =>{
            if (err) throw err;
            res(JSON.parse(results))
        });
    })
}

module.exports = keywordExtract;