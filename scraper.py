import requests
from bs4 import BeautifulSoup
import datetime
from geopy.geocoders import Nominatim
geolocator = Nominatim()
from firebase.firebase import FirebaseApplication
firebase = FirebaseApplication('https://princetonevents-3aeed.firebaseio.com/')

r = requests.get("https://www.princeton.edu/events")
soup = BeautifulSoup(r.content, "html.parser")

end = datetime.date.today() + datetime.timedelta(days=7) # data for a week
end = end.strftime("%B")[:3] + " " + str(int(end.strftime("%d")))

prev = datetime.date.today() + datetime.timedelta(days=-1)
prev = prev.strftime("%B")[:3] + " " + str(int(prev.strftime("%d")))

done = False

for h3 in soup.find_all("h3"):
    eventName = h3.string # EVENT NAME
    subheader = h3.find_next()
    location = subheader.find_next()
    if (location.text == ""):
        eventWhere = "See website for details"
        latitude = 40.3440 # default
        longitude = -74.6514 # default
    else:
        eventWhere = location.text # EVENT LOCATION
        address = geolocator.geocode(eventWhere + " Princeton")
        latitude = address.latitude
        longitude = address.longitude
    eventWhen = location.next_sibling.strip() # EVENT TIME
    eventDate = " ".join(subheader.find_next().find_next().text.split()) # EVENT DATE
    if (eventDate == end):
        break
    if (eventDate != prev): # new date
        prev = eventDate
        if (firebase.get('/items/' + eventDate, None) != None):
            done = True
        else:
            done = False
    if (done): # this date's events have already been added
        continue
    eventWhat = (subheader.next_sibling.strip() + "More information at "
           "princeton.edu" + h3.parent.get("href")) # EVENT DETAILS LINK
    event = {
        "name": eventName,
        "what": eventWhat,
        "when": eventWhen,
        "where": eventWhere,
        "who": "Princeton University Public Events",
        "latitude": latitude,
        "longitude": longitude,
    }
    firebase.post('/items/' + eventDate, event)
