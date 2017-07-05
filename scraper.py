import requests
from bs4 import BeautifulSoup
import datetime
from firebase.firebase import FirebaseApplication
firebase = FirebaseApplication('https://princetonevents-3aeed.firebaseio.com/')

r = requests.get("https://www.princeton.edu/events")
soup = BeautifulSoup(r.content, "html.parser")

end = datetime.date.today() + datetime.timedelta(days=7) # data for a week
end = end.strftime("%B")[:3] + " " + str(int(end.strftime("%d")))

for h3 in soup.find_all("h3"):
    eventName = h3.string # EVENT NAME
    subheader = h3.find_next()
    location = subheader.find_next()
    if (location.text == ""):
        eventWhere = "See website for details"
    else:
        eventWhere = location.text # EVENT LOCATION
    eventWhen = location.next_sibling.strip() # EVENT TIME
    eventDate = " ".join(subheader.find_next().find_next().text.split()) # EVENT DATE
    if (firebase.get('/items/' + eventDate, None) != None):
        continue
    if (eventDate == end):
        break
    eventWhat = (subheader.next_sibling.strip() + "More information at "
           "princeton.edu" + h3.parent.get("href")) # EVENT DETAILS LINK
    event = {
        "name": eventName,
        "what": eventWhat,
        "when": eventWhen,
        "where": eventWhere,
        "who": "Princeton University Public Events"
    }
    firebase.post('/items/' + eventDate, event)
