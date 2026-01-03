import requests 
from bs4 import BeautifulSoup

# doing the chek to load the website using the requests
try:
    r = requests.get("https://www.google.com")
    r.raise_for_status()
    html_content = r.text 
except requests.exceptions.RequestException as e:
    print(f"There was an error loading page: {e}")
    exit()


# butifying the html content
soup = BeautifulSoup(html_content, 'html.parser')

# the title??
title = soup.title

# heading section 
heading = ['h1','h2','h3','h4','h5','h6']
all_headings = soup.find_all(heading)

# we got the para first try baby
para = soup.p

file_name = title.get_text()+".html"

# now making a file with that and writing it 
with open(file_name, 'w') as file:
    file.write(f"{title}\n{all_headings}\n{para}")

# print(file_name)