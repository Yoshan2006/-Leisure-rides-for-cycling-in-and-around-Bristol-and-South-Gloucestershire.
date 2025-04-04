# Requirements

## User Needs

### User stories
As a cyclist I want a website I can connect to that generates optimal cycle routes
for me to find new and interesting paths to cycle.

As a dog walker I like to walk my dog while riding my bike. I would like a website that I can use
that displays cycle paths for me so that I can discover some interesting places
to walk my dog whle I ride.

These two user stories describe the kind of users that can benefit from this cycle route display system.

### Actors
- Hobbyist cyclists:
They benefit from this by having the ability to generate cycle routes to different places and find the existing cycle
routes they may not know about.
- Cyclists to work / school:
They benefit from this by being able to see avilable cycle paths near them that have nice views and are a fun, leisurely ride overall.
- Dog walkers:
The webapp can be helpful for them as they can see different areas where they could ride
their bike and walk their dog
- Parents:
This webapp would benefit parents by giving them access to the safest and most public cycle
routes that their children can take to school, picking the ones with the least difficulty.

### Use Cases
 

(Joe's use case)
| UC1 | Generate Cycle Routes |
| -------------------------------------- | ------------------- |
| **Description** | Allows the user to generate different cycle routes to a destination. |
| **Actors** | Hobbyist cyclists, Dog walkers, Parents, Cyclists work / school. |
| **Assumptions** | We have enough resources using the OpenData and Google Maps APIs to generate optimal routes. |
| **Steps** | User should input a start place and destination, and the webapp will receive cycle routes between these areas using the OpenData API and turn it into one consecutive route. |
| **Variations** | Occasionally, there will be no cycle paths in some areas. The user will be alerted of this, and the route generator will handle the error. |
| **Non-functional** | System should be fast and develop genuinely optimal or heuristic, close-to-optimal cycle routes with the data provided. |
| **Issues** | Issue around finding optimal cycle paths quickly - may be a large amount of nodes to traverse in a pathfinding algorithm. |


 
 
(Mihiranga's ues case)
| UC2 | View cycle routes on the map | 
| -------------------------------------- | ------------------- |
| **Description** |  Allows the user to view generated cycle routes visually on an interactive map.
| **Actors** |  Hobbyist cyclists, Dog walkers.
| **Assumptions** | The Google Maps API and the OpenData API are accessible into the web app to display the routes.
| **Steps** | The user sees a pre-existing route drawn on the map. They hover over it, highlighting the path, and click which opens a menu. The menu displays the route's name, description, distance, time-to-complete, difficulty and colour code.
| **Variations** | This functionality only exists for pre-existing routes acquired by the Bristol OpenData API. Generated routes will not be able to be clicked and viewed.
| **Non-functional** | The map and routes should load quickly and be interactive, providing smooth zoom and pan functionality. The route lines and markers should be clear and distinguishable when highlighted, even in areas with complex paths.
| **Issues** | Potential challenges with route rendering on the map if there are too many overlapping or complex routes.

## Use Case Diagram

![UCD](images/UseCaseDiagram.png)

## Robustness Diagram UC1

![RD1](images/RobustnessDiagram1.png)

## Robustness Diagram UC2

![RD2](images/RobustnessDiagram2.png)

## Software Requirements Specification
### Functional requirements
Functional requirement:
- FR1: The system shall allow the user to generate a cycle route between two places
and display it on a map (UC1)
- FR2: The system shall let the user view existing cycle paths on a map (UC2)
- FR3: The system shall display information about existing cycle paths when clicked,
specifically the name, description, distance, time-to-complete, the difficulty and the colour code. (UC2)

### Non-Functional Requirements
- NFR1: The system should load the map to the page in under 2 seconds
- NFR2: The system should have an instantly responsive map interaction
- NFR3: The system should load routes to the page in under 1 seconds after the map loads
- NFR4: The system should be able to generate paths in under 3 seconds
- NFR5: The system should generate optimal paths (at minimum top-3 quickest)
- NFR6: The system should have a map with clear and distinguishable paths
- NFR7: The system should display an error if it is unable to connect to Bristol OpenData **(boundary case)**
- NFR8: The system should display an error if it is unable to connect to GoogleMaps API **(boundary case)**
