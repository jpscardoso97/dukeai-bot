# Data sourcing and cleaning

import requests
from bs4 import BeautifulSoup
import json
import re

data = ""

pages = [
    'https://ai.meng.duke.edu/faculty/jon-reifschneider', 
    'https://ai.meng.duke.edu/faculty/brinnae-bent', 
    'https://ai.meng.duke.edu/faculty/xu-chen', 
    'https://ai.meng.duke.edu/faculty/alfredo-deza', 
    'https://ai.meng.duke.edu/faculty/noah-gift', 
    'https://ai.meng.duke.edu/faculty/wann-jiun-ma', 
    'https://ai.meng.duke.edu/faculty/pramod-singh', 
    'https://ai.meng.duke.edu/faculty/natalia-summerville', 
    'https://ai.meng.duke.edu/faculty/theodore-ryan', 
    'https://ai.meng.duke.edu/faculty/richard-telford', 
    'https://ai.meng.duke.edu/faculty/jeffrey-ward'
    "https://ai.meng.duke.edu/courses",
    "https://ai.meng.duke.edu",
    "https://ai.meng.duke.edu/news/new-masters-degree-applies-ai-product-innovation",
    "https://ai.meng.duke.edu/news/using-ai-teach-ai-dukes-master-engineering-degree-program",
    "https://ai.meng.duke.edu/news/dukes-new-masters-degree-applies-ai-product-innovation",
    "https://ai.meng.duke.edu/news/where-are-stem-jobs-north-carolinas-charlotte-no-1-and-raleigh-no-5-new-index",
    "https://ai.meng.duke.edu/news/shining-spotlight-shyamal-anadkat22",
    "https://ai.meng.duke.edu/news/shining-spotlight-eduardo-martinez",
    "https://ai.meng.duke.edu/courses#program-preparation",
    "https://ai.meng.duke.edu/why-duke/graduate-outcomes",
    "https://ai.meng.duke.edu/courses#capstone",
    "https://ai.meng.duke.edu/courses#pre-program",
    "https://ai.meng.duke.edu/courses#technical-core",
    "https://ai.meng.duke.edu/courses#management-core",
    "https://ai.meng.duke.edu/courses#operations-core",
    "https://ai.meng.duke.edu/courses#electives",
    "https://ai.meng.duke.edu/news/shining-spotlight-diarra-bell",
    "https://ai.meng.duke.edu/why-duke/difference",
    "https://ai.meng.duke.edu/",
    "https://ai.meng.duke.edu/industry",
    "https://ai.meng.duke.edu/leadership",
    "https://ai.meng.duke.edu/news",
    "https://ai.meng.duke.edu/contact",
    "https://ai.meng.duke.edu/why-duke",
    "https://ai.meng.duke.edu/why-duke/career-services",
    "https://ai.meng.duke.edu/why-duke/tech-leaders",
    "https://ai.meng.duke.edu/degree",
    "https://ai.meng.duke.edu/certificate",
    "https://ai.meng.duke.edu/faculty",
    "https://ai.meng.duke.edu/apply"

for page in pages:
    page = requests.get(page)
    soup = BeautifulSoup(page.content, 'html.parser')
    content = soup.find('div', id='content-body')
    data = content.get_text()
    data = re.sub(r'\n\n', '\n', data)
    filename = page.url.split('/')[-1]
    with open(f'../data/raw/{filename}.txt', 'w') as f:
        f.write(data)
