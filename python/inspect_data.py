import json
import os
from collections import defaultdict

path = os.getcwd()

with open(os.path.join(path, "..", "src", "data", "fastest_solvers.json"), "r") as infile:
    data = json.load(infile)

with open(os.path.join(path, "..", "src", "data", "problems.json"), "r") as infile:
    problem_data = json.load(infile)
    problems = { problem["problem_number"] : problem for problem in problem_data}

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
for user, rankings in user_data.items():
    by_difficulty = defaultdict(lambda: { "count" : 0, "wins": 0, "eulerianPoints": 0})
    for ranking in rankings:
        difficulty = ranking["difficulty"]
        if 5 <= difficulty <= 25:
            difficulty_class = 5
        if 30 <= difficulty <= 50:
            difficulty_class = 30
        if 50 <= difficulty <= 75:
            difficulty_class = 55
        if 80 <= difficulty <= 100:
            difficulty_class = 80
        by_difficulty[difficulty_class]["count"] += 1
        by_difficulty[difficulty_class]["wins"] += int(ranking["place"] == 1)
        by_difficulty[difficulty_class]["eulerianPoints"] += max(0, 51 - ranking["place"])
    
    output.append({
        "username" : user,
        "rankings" : rankings,
        "stats" : [{"difficultyClass" : difficulty_class, **data} for difficulty_class, data in by_difficulty.items()]
    })

print("Saving ...")
with open(os.path.join(path, "..", "src", "data", "users.json"), "w") as outfile:    
    json.dump(output, outfile, indent=2)