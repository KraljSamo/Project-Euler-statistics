import json
import os
from collections import defaultdict

path = os.getcwd()

with open(os.path.join(path, "..", "src", "data", "fastest_solvers.json"), "r") as infile:
    data = json.load(infile)

user_data = defaultdict(list)

for index, problem in enumerate(data):
    for entry in problem["fastest_solvers"]:
        user = entry["username"]
        place = entry["place"]
        user_data[user].append({
            "problem" : problem["problem"],
            "place" : place
        })

with open(os.path.join(path, "..", "src", "data", "users.json"), "w") as outfile:
    output = [{ "username" : user, "standings" : standings } for user, standings in user_data.items()]
    print("Saving ...")
    json.dump(output, outfile, indent=2)