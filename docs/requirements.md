# Requirements

## User Needs

### User stories
As a cyclist I want a website I can connect to from my phone that generates optimal cycle routes
for me to follow to a destination so that I can cycle anywhere without having to know the way.

As a dog walker I like to walk my dog while riding my bike. I would like a website that I can use
from my phone that displays cycle paths for me so that I can see what are some interesting places
to walk my dog.

These two user stories describe the kind of users that can benefit from this cycle route display system.

### Actors
- Hobbyist cyclists:
They benefit from this by having the ability to generate cycle routes to different places
- Cyclists to work / school:
They benefit from this by being able to see avilable cycle paths near them
- Dog walkers:
The webapp can be helpful for them as they can see different areas where they could ride
their bike and walk their dog
- Parents:
This webapp would benefit parents by giving them access to the safest and most public cycle
routes that their children can take to school.

### Use Cases
TODO: Describe each use case (at least one per team member).
    Give each use case a unique ID, e.g. UC1, UC2, ...
    Summarise these using the use-case template below.

| UC1 | Generate Cycle Routes |
| -------------------------------------- | ------------------- |
| **Description** | Allows the user to generate different cycle routes to a destination. |
| **Actors** | Hobbyist cyclists, Dog walkers, Parents, Cyclists work / school. |
| **Assumptions** | We have enough resources using the OpenData and Google Maps APIs to generate optimal routes. |
| **Steps** | User should input a start place and destination, and the webapp will receive cycle routes between these areas using the OpenData API. |
| **Variations** | Occasionally, there will be no cycle paths in some areas. The user will be alerted of this. |
| **Non-functional** | System should be fast and develop genuinely optimal or close-to-optimal cycle routes with the data provided. |
| **Issues** | Issue around finding optimal cycle paths - potentially use a shortest path algorithm such as A-star algorithm |


// Joe: Yoshan you need to do this table, because the document says each team member should do one use case //
 
| UC2 | View cycle routes on the map | 
| -------------------------------------- | ------------------- |
| **Description** | TODO: Goal to be achieved by use case and sources for requirement |
| **Actors** | TODO: List of actors involved in use case |
| **Assumptions** | TODO: Pre/post-conditions if any</td></tr>
| **Steps** | TODO: Interactions between actors and system necessary to achieve goal |
| **Variations** | TODO: OPTIONAL - Any variations in the steps of a use case |
| **Non-functional** | TODO: OPTIONAL - List of non-functional requirements that the use case must meet. |
| **Issues** | TODO: OPTIONAL - List of issues that remain to be resolved |

TODO: Your Use-Case diagram should include all use-cases.

![Insert your Use-Case Diagram Here](images/use-case.png)

## Software Requirements Specification
### Functional requirements
TODO: create a list of functional requirements. 
    e.g. "The system shall ..."
    Give each functional requirement a unique ID. e.g. FR1, FR2, ...
    Indicate which UC the requirement comes from.


### Non-Functional Requirements
TODO: Consider one or more [quality attributes](https://en.wikipedia.org/wiki/ISO/IEC_9126) to suggest a small number of non-functional requirements.
Give each non-functional requirement a unique ID. e.g. NFR1, NFR2, ...

Indicate which UC the requirement comes from.
