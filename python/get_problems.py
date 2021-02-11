import json
import requests
from bs4 import BeautifulSoup
import time
import re
import datetime as dt

URL = "https://projecteuler.net/archives;page="

cookies = {
}

MONTH_TO_NUMBER = {
    "January" : 1,
    "February" : 2,
    "March" : 3,
    "April" : 4,
    "May" : 5,
    "June" : 6,
    "July" : 7,
    "August": 8,
    "September": 9,
    "October" : 10,
    "November" : 11,
    "December" : 12
}

def parse_row(row, difficulty=False):
    return {        
        "problem_number": int(row[0]),
        "problem_name": row[1],
        "solvers": int(row[2]),
        "difficulty": int(re.findall("rating: (\d*)%", row[3])[0]) if difficulty else 0
    }

def get_release_date(row):
    date_pattern = "Published on .*?, (\d{1,2})\w{2} (\w*) (\d{4}), (\d\d):\d\d (\w\w)"
    result = re.findall(date_pattern, row)[0]
    day, month, year, hour, ampm = result
    month = MONTH_TO_NUMBER[month]
    day, year, hour = int(day), int(year), int(hour)
    if ampm == "pm":
        hour += 12
    
    release_date = dt.datetime(year, month, day, hour)
    return release_date.strftime("%Y-%m-%dT%H:%M:%S")

def get_problems(page=1, recent=False):
    if recent:
        r = requests.get("https://projecteuler.net/recent", cookies=cookies)
    else:
        r = requests.get(URL + str(page), cookies=cookies)
    soup = BeautifulSoup(r.text, "html.parser")

    problems = []
    for row in soup.find_all("tr")[1:]:
        row_data = []
        for col in row.find_all("td"):
            row_data.append(col.text)

        try:
            parsed = parse_row(row_data, difficulty=recent==False)
        except Exception as e:
            print(e)
            print("Didnt manage to parse", row_data)
            continue
    
        parsed["release_date"] = get_release_date(str(row))
        problems.append(parsed)
    
    return problems

problem_data = []
for page in range(1, 16):
    problems = get_problems(page)
    problem_data.extend(problems)

problem_data.extend(get_problems(recent=True))

with open("problems.json", "w") as outfile:
    json.dump(problem_data, outfile, indent=2)
