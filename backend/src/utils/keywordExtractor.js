const { PythonShell } = require('python-shell')

const keywordExtract = (bio, readmes) => {
    return new Promise((res, _) => {
        const bigReadme = readmes.join('')

        PythonShell.run('src/utils/keyword-extractor.py', { args: [bio, bigReadme] }, (err, results) => {
            if (err) throw err;
            res(JSON.parse(results))
        });
    })
}

const filterKeywords = (extractedKeywords, repoLanguagesSummary) => {
    const languagesKeywords = [...extractedKeywords.programming_languages]
    const languagesLowerCase = languagesKeywords.map(l => l.toLowerCase())
    const sortedRepoLanguages = Object.entries(repoLanguagesSummary)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    const repoLanguages = Object.keys(sortedRepoLanguages)
    let i = languagesKeywords.length
    let j = 0
    while (i < 5 && j < repoLanguages.length) {
        if (!languagesLowerCase.includes(repoLanguages[j].toLowerCase())) {
            languagesKeywords.push(repoLanguages[j])
            i++
        }
        j++
    }

    return languagesKeywords.concat(extractedKeywords.roles, extractedKeywords.fields)
}

module.exports = { keywordExtract, filterKeywords };