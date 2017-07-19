import requests
from bs4 import BeautifulSoup
import datetime
from geopy.geocoders import Nominatim
geolocator = Nominatim()
from firebase.firebase import FirebaseApplication
firebase = FirebaseApplication('https://princetonevents-3aeed.firebaseio.com/')

def timeCompare(day1, day2):
    calendar = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
                "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12}

    month1 = calendar[day1[:3]]
    month2 = calendar[day2[:3]]
    if (month1 == month2): # same month
        if (int(day1[4:]) < int(day2[4:])):
            return -1 # day 1 comes before day 2
        elif (int(day1[4:]) == int(day2[4:])):
            return 0
        else:
            return 1
    else:
        if (month1 - month2 > 10): # December, January
            return -1
        elif (month1 - month2 < -10): # January, December
            return 1
        elif (month1 < month2):
            return -1
        elif (month1 == month2):
            return 0
        else:
            return 1

dates = set()

def deleteOld():
    today = datetime.date.today()
    today = today.strftime("%B")[:3] + " " + str(int(today.strftime("%d")))

    items = firebase.get('/items', None)

    for item in items:
        if (timeCompare(item, today) < 0): # the event happened before today
            firebase.delete('/items', item)
        else:
            dates.add(item)

    users = firebase.get('/users', None)
    for user in users:
        my_events = firebase.get('/users/' + user, 'my_events')
        if (my_events != None):
            for event in my_events:
                if (timeCompare(event, today) < 0):
                    firebase.delete('/users/' + user + '/my_events', event)
        saved_events = firebase.get('/users/' + user, 'saved_events')
        if (saved_events != None):
            for event in saved_events:
                if (timeCompare(event, today) < 0):
                    firebase.delete('/users/' + user + '/saved_events', event)


def getNew(site):
    r = requests.get(site)
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
            continue # we don't want events that don't have a location
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
            if (eventDate in dates):
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
            "startTime": eventWhen,
            "endTime": "N",
            "where": eventWhere,
            "who": "Princeton University Public Events",
            "latitude": latitude,
            "longitude": longitude,
        }
        firebase.post('/items/' + eventDate, event)

deleteOld()
getNew("https://www.princeton.edu/events")
getNew("https://www.princeton.edu/events?page=1")
