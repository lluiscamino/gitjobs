import json
import sys
import csv
from nltk import ngrams


def remove_punctuation(bio):
    punctuation = '!"$%&()*,:;<=>?@[\\]^_`{|}~'
    bio = bio.translate({ord(ch): "" for ch in punctuation})
    return bio


def remove_dots(word):
    if word.endswith("."):
        return word[:-1]
    elif word.endswith(".."):
        return word[:-2]
    elif word.endswith("..."):
        return word[:-3]
    return word


files = {
    "programming_languages": "resources/programming_languages.csv",
    "roles": "resources/roles_en.csv",
    "fields": "resources/fields_en.csv",
}
bio = sys.argv[1]
bio = remove_punctuation(bio.lower())

descriptions = {
    "programming_languages": [],
    "roles": [],
    "fields": [],
}
result_descriptions = {
    "programming_languages": [],
    "roles": [],
    "fields": [],
}
longest_language_len = 1

for key, file in files.items():
    with open(file, encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            descriptions[key].append(row[0])
            if len(row[0].split()) > longest_language_len:
                longest_language_len = len(row[0].split())

    tmp_descriptions = []

    # Descriptions are of length [1, the longest description]
    for n in range(1, longest_language_len + 1):
        bio_final = [remove_dots(word) for word in bio.split()]
        n_grams = ngrams(bio_final, n)

        for grams in n_grams:
            if " ".join(grams) in descriptions[key]:
                tmp_descriptions.append(" ".join(grams))

    result_descriptions[key] = tmp_descriptions

print(json.dumps(result_descriptions))
