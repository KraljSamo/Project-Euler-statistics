import json
import os
from collections import defaultdict

path = os.getcwd()

with open(os.path.join(path, "..", "src", "data", "fastest_solvers.json"), "r") as infile:
    data = json.load(infile)

with open(os.path.join(path, "..", "src", "data", "problems.json"), "r") as infile:
    problem_data = json.load(infile)
    problems = { problem["problem_number"] : problem for problem in problem_data}
    for problem in problems: # Add default values
        problems[problem]["winner_solve_time_raw"] = None
        problems[problem]["winner_solve_time_in_seconds"] = None
        problems[problem]["top10_solve_time_raw"] = None
        problems[problem]["top10_solve_time_in_seconds"] = None
        problems[problem]["top50_solve_time_raw"] = None
        problems[problem]["top50_solve_time_in_seconds"] = None
        problems[problem]["top100_solve_time_raw"] = None
        problems[problem]["top100_solve_time_in_seconds"] = None

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
        
        if place == 1:
            problems[problem_num]["winner_solve_time_raw"] = entry["time_raw"]
            problems[problem_num]["winner_solve_time_in_seconds"] = entry["time_in_seconds"]
        if place == 10:
            problems[problem_num]["top10_solve_time_raw"] = entry["time_raw"]
            problems[problem_num]["top10_solve_time_in_seconds"] = entry["time_in_seconds"]
        if place == 50:
            problems[problem_num]["top50_solve_time_raw"] = entry["time_raw"]
            problems[problem_num]["top50_solve_time_in_seconds"] = entry["time_in_seconds"]
        if place == 100:
            problems[problem_num]["top100_solve_time_raw"] = entry["time_raw"]
            problems[problem_num]["top100_solve_time_in_seconds"] = entry["time_in_seconds"]

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

with open(os.path.join(path, "..", "src", "data", "problems.json"), "w") as outfile:    
    json.dump(list(problems.values()), outfile, indent=2)