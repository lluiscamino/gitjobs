import json
import sys

output = {
    'bio': sys.argv[1],
    'example': ['lorem', 'ipsis', 'verbim'],
    'bigreadme': sys.argv[2],
}

print(json.dumps(output))
