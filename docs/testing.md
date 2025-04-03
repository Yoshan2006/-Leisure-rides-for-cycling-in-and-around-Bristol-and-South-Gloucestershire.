# Testing

## Test Plan

### Test Case 1

Test that the system loads the map to the page in under 2 seconds to ensure
it is responsive and feels good to open. This will be tested using a timer and
multiple repetitions to see that it is consistent.

### Test Case 2

Test that the map interactions such as dragging and scrolling are instantaneous
and do not suffer from lag for whatever reason. This will be tested by simply interacting
with the map and paying attention for any kind of delay.

### Test Case 3

Test that the system loads routes to the page in under 1 second after the map
has loaded. This will be tested using a timer from when the map begins loading to
when the routes have appeared on the map, as well as repeating this process multiple
times to ensure it is up to standard every time.

### Test Case 4

Test that the system is able to generate paths in under 3 seconds. This will be tested
using a timer from when the generate route button is pressed to when the route appears
on the map.

### Test Case 5

Test that the system generates optimal paths - at least in the top 3 quickest routes along
the cycle paths. This will be tested by 

### Test Case 6

Test that the system's map displays clear and distinguishable paths from one another, this will
be tested by using the hover-over-routes functionality to see if it is able to highlight individual
routes among areas with cramped and overlapping routes.

### Test Case 7

Test that hte system displays an error if it is unable to connect to the Bristol OpenData servers.
This will be tested by changing the fetch URL to an incorrect one, and seeing if it shows an error message
to the user.

### Test Case 8

Test that hte system displays an error if it is unable to connect to the Google Maps servers.
This will be tested by changing the script src HTTP URL to an incorrect one, and seeing if it shows an error message
to the user.

### Test Case 9

Test that the system allows the user to generate cycle route along the existing ones. This can be tested by simply
using the route generator as intended and observing whether or not it works as intended.

### Test Case 10

Test that the system displays existing cycle paths on the map. This can be tested by opening the webapp
and observing whether or not there are routes being displayed.

### Test Case 11

Test that the system allows the user to view information regarding cycle routes by clicking on them.

## Test Runs

| **Use-Case ID** | **Requirement ID** | **Test Case** | **Status** |
| ----------- | -------------- | --------- | ------ |
|  UC1, UC2   |      NFR1      |     1     |  pass  |
|  UC1, UC2   |      NFR2      |     2     |  pass  |
|     UC2     |      NFR3      |     3     |  pass  |
|     UC1     |      NFR4      |     4     |  pass  |
|     UC1     |      NFR5      |     5     |  pass  |
|     UC2     |      NFR6      |     6     |  pass  |
|  UC1, UC2   |      NFR7      |     7     |  pass  |
|  UC1, UC2   |      NFR8      |     8     |  pass  |
|     UC1     |      FR1       |     9     |  pass  |
|     UC2     |      FR2       |    10     |  pass  |
|     UC2     |      FR3       |    11     |  pass  |
