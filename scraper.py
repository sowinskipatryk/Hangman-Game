# This is a simple scraper used to get data in json 
# format for the game.
# I split the code into two parts - first part 
# (commented out) scrapes the site for polish 
# proverbs and saves the output in txt file while
# the second part opens the saved txt file and
#  converts it to json format.

# import requests
# from bs4 import BeautifulSoup
import json
#
# urls = ['https://pl.wiktionary.org/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pageuntil=gdy+przyjdzie+%C5%9Bwi%C4%99ta+Agnieszka%2C+przebije+l%C3%B3d+ogonem+pliszka#mw-pages',
#         'https://pl.wiktionary.org/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pagefrom=gdy+przyjdzie+%C5%9Bwi%C4%99ta+Agnieszka%2C+przebije+l%C3%B3d+ogonem+pliszka#mw-pages',
#         'https://pl.wiktionary.org/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pagefrom=komu+chleb+zaszkodzi%2C+temu+kij+pomo%C5%BCe#mw-pages',
#         'https://pl.wiktionary.org/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pagefrom=nie+mi%C5%82a+jest+taka+praca%2C+za+kt%C3%B3r%C4%85+nie+bywa+p%C5%82aca#mw-pages',
#         'https://pl.wiktionary.org/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pagefrom=%C5%9Bwi%C4%99tej+Agaty+uschn%C4%85+szmaty#mw-pages']
#
# arr = []
# for url in urls:
#     r = requests.get(url)
#     soup = BeautifulSoup(r.text, 'html.parser')
#     quotes = soup.find_all('li')
#     for quote in quotes:
#         arr.append(quote.text)

# with open('data.txt', 'w', encoding='utf-8') as file:
#     for each in arr:
#         file.write(each.capitalize()+'\n')

dict = {}
with open('data.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()
    for i, x in enumerate(lines):
        dict[i+1] = x.replace('\n','')

with open('data.json', 'w') as f:
    json.dump(dict, f)
