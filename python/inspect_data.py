import json
import os
from collections import defaultdict

path = os.getcwd()

with open(os.path.join(path, "..", "src", "data", "fastest_solvers.json"), "r") as infile:
    data = json.load(infile)

with open(os.path.join(path, "..", "src", "data", "problems.json"), "r") as infile:
    problem_data = json.load(infile)
    problems = { problem["problem_num"] : problem for problem in problem_data}

user_data = defaultdict(list)

for index, problem in enumerate(data):
    problem_num = problem["problem"]
    for entry in problem["fastest_solvers"]:
        user = entry["username"]
        place = entry["place"]
        user_data[user].append({
            "problem" : problem_num,
            "place" : place,
            "difficulty" : problems[problem_num]["difficulty"]
        })

output = []
for user, achievements in user_data.items():
    pass

with open(os.path.join(path, "..", "src", "data", "users.json"), "w") as outfile:
    output = [{ 
        "username" : user, 
        "standings" : standings, 
        "count" : len(standings), 
        "wins" : len([e for e in standings if e["place"] == 1]) } 
        for user, standings in user_data.items()]
    print("Saving ...")
    json.dump(output, outfile, indent=2)