# Almanac

Daily Almanac Which Tracks Daily Information a User Might Find Helpful

## Authors: 
1. [Paul Kirschner](https://github.com/kirschnerp)
2. [Carolene Wilson-Grizzle](https://github.com/Carolenesw)
3. [Dameon Charley](https://github.com/dameonc13)
4. [Matt Dambra](https://github.com/superrmatt)

## Table of Contents
1. [News](https://github.com/Carolenesw/Almanac#news)
2. [Calendar](https://github.com/Carolenesw/Almanac#calendar)
3. [Word of the day](https://github.com/Carolenesw/Almanac#word-of-the-day)
4. [Weather](https://github.com/Carolenesw/Almanac#weather)
5. [Historical event "on this day"](https://github.com/Carolenesw/Almanac#on-this-day)
6. [Additional Functionality](https://github.com/Carolenesw/Almanac#additional-functionality-possiblities)

## 

### News
Determined via API call to newsapi.org, prints up to 8 articles at one time, and allows the user to follow a link to the full article. Articles are chosen as first, there are no filters about what is being printed. The number of printed articles can be easily manipulated. In the news() function.

### Calendar
Shows the calendar for many years before and after current date. Next button allows user to jump to next month. Previous button allows user to jump to previous month.

### Word of the Day
Chosen at first load after midnight and reaches out to a dictionary API. The word is chosen at random from a dictionary of roughly 80,000 words. The word, part of speech and up to three definitions.

### Weather 
Chosen based on geolocation (upon user approval of location tracking), and can also be chosen via a search function. THe Geolocation is not totally accurate and can sometimes give the user weather from a few towns over. This is a problem with the creation of the coordinates, and not an issue in our code.

### On This Day
Displays a random historical event that occured on this date. This is accomplished by querying an API that reaches out to wikpedia and scans for events that occured. This event is chosen at random on load. Therefore, user can read all possible events by simply refreshing, unlike word of the day.


### Additional Functionality Possiblities:
By use of Bulma tiles, we can add infinite tiles to the webpage. <br/>
Some brainstormed ideas we had were:
1. Horoscope information: this would require user to enter in birthdate.
2. Holiday and event tracking: holidays could be obtained from a calendar api, evnets would require user input. For example: putting a work schedule, various appointments, etc.
3. Stock information: user could create a stock watchlist, or get a few "big names" such as Amazon, Apple, Microsoft, etc.
4. Notepad, track notes with user input.
5. Clock with timer, etc
6. Calculator
7. The possiblities really are endless.
8. Users could also determine their own tiles, customly designed to be placed on the page where they see fit.

