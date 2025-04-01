# Project Proposal

## Business Case

### Problem statement
In Bristol and South Gloucestershire, cyclists don't have an easy way of finding leisure cycling routes and potentially may find that existing route planners are not fit to their ride-enjoyment needs. Important ride information, such as route difficulty or time-to-complete, are often lacking or non-existent, which can frustrate users who seek the best of both worlds - cycling sites containing route information and a route planner. The goal of this project is to make a web app to help users effortlessly plan their cycle journeys along leisure paths, discover new existing routes and generate their own routes through existing leisure cycle paths.
 
### Business benefits
This web app will make it easy for users to find information about cycling routes in Bristol and South Gloucestershire. Its specific demographic of cyclists in the Bristol and South Gloucestershire area promotes tourism from other areas of the UK, as well as easy ways to stay active and easy transportation as a whole, all of which should increase customer retention with the webapp and form a community of locals and tourists.
Alongside this, the customisable aspect of the route generator appeals to users' preferences and would create an engaged and loyal user-base.

### Options Considered
- Komoot: The Komoot app helps users to planning their cycling routes based on distance, difficulty, and terrain. It's good for road and mountain biking.
- Strava: A good app for tracking cycling activities and discovering new routes. Strava offers detailed ride statistics and route recommendations.
- Google Maps (Cycling Mode): Google Maps is the most popular in the world and it offers basic route planning for cyclists, showing bike lanes and paths for easy navigation.

We aim to improve upon the foundation of these existing applications by incorporating a selection of the best features found in them and putting them all in one place. 
- While Komoot is a great choice for route planning and leisure rides, it does not have any supported routes in Bristol or South Gloucestershire.
- Strava is a service with an decent variety of routes and information, however it lacks a route generator and instead has a strong focus on tracking your cycling journeys.
- Google Maps as a whole is amazing for getting from point A to point B, but it doesn't have a good range of information regarding cycling routes in particular, nor does it have a stake in the leisure-ride side of things.

### Expected Risks
Inaccurate Data: Inaccurate or outdated data of the routes.

Data Accessibility in Dependencies: If the Bristol Open Data API or Google Maps API are not available, the app would not be usable.

Technical Issues: It may be challenging using the required APIs in such a complex way, given that we have not used them before.

## Project Scope
- Querying the Bristol OpenData API
- Making a request to the Google Maps API to get the map interface and javascript functions to interact with it
- Displaying cycling routes on a map view
- Displaying cycling route information
- Generating bigger cycle routes made up of smaller ones between a start and end destination.
- Creating the web app using only HTML5, CSS and JS - no framework or library.
  
## Context Diagram
![Insert your Context Diagram Here](images/ContextDiagram.png)
