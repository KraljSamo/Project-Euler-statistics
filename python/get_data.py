import json
import requests
from bs4 import BeautifulSoup
import time

URL = "https://projecteuler.net/fastest="
START_PROBLEM = 277

cookies = {
    # Your PE cookies here
}

def raw_time_to_seconds(raw_time):
    total_seconds = 0
    parts = raw_time.split(",")
    for part in parts:
        if "year" in part:
            total_seconds += int(part.split()[0]) * 365 * 24 * 60 * 60
        elif "week" in part:
            total_seconds += int(part.split()[0]) * 7 * 24 * 60 * 60
        elif "day" in part:
            total_seconds += int(part.split()[0]) * 24 * 60 * 60
        elif "hour" in part:
            total_seconds += int(part.split()[0]) * 60 * 60
        elif "minute" in part:
            total_seconds += int(part.split()[0]) * 60
        elif "second" in part:
            total_seconds += int(part.split()[0])
    return total_seconds

def prettify_user_data(row):

    place = int(row[0][:-2])
    username = row[1]
    language = row[3]
    time_raw = row[4]
    time_in_seconds = raw_time_to_seconds(time_raw)

    return {
        "place" : place,
        "username" : username,
        "language" : language,
        "time_raw" : time_raw,
        "time_in_seconds" : time_in_seconds
    }

def get_fastest_solvers(problem_num):
    r = requests.get(URL + str(problem_num), cookies=cookies)
    soup = BeautifulSoup(r.text, "html.parser")

    whole_table = []

    rows = soup.find_all("tr")
    for row in rows:
        row_data = []
        for col in row.find_all("td"):
            row_data.append(col.text)
        if len(row_data) > 10: # First row that is returned contains the whole table. Quick fix: ignore it.
            continue
        whole_table.append(prettify_user_data(row_data))
    
    return whole_table

try:
    with open("fastest_solvers.json", "r") as infile:
        data = json.load(infile)
except:
    data = []

for problem_num in range(277, 747):
    table = get_fastest_solvers(problem_num)
    data.append({
        "problem" : problem_num,
        "fastest_solvers" : table
    })

    with open("fastest_solvers.json", "w") as outfile:
        json.dump(data, outfile, indent=2)
    
    print(f"Data for problem {problem_num} collected")
    time.sleep(0.5)