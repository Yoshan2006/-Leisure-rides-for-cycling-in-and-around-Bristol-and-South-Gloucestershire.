# Implementation

## Description of the System

The webapp uses the Bristol OpenData API to receive leisure cycling route information from the leisure rides dataset.
The Google Maps API and Google Maps Javascript API acts as a medium to visually display the geometry of the routes.
The user can view other properties of routes from the leisure rides dataset by hovering and clicking on a route. This 
is signalled to the user via the highglight of each route upon hovering over them. The user can also generate their own
routes (which use the existing known routes as paths) - the program converts each coordinate of each route to a node in a
graph and performs a dijkstra's algorithm on them. The edges of adjacent routes that are not inherently linked together in the
JSON query are linked together by being input into a quadtree data structure and testing nodes within nearby squares of the quadtree
to see if they are within a certain distance. In the end, this is displayed to the user with a thicker line than the rest of the routes.

## Project Structure

Here is a tree view of every file contained within the project folder.

- help page
  - help.html
  - styles.css
- main page
  - index.html
  - styles.css
  - index.js
  - img
    - help_icon.png
    - marker_icon.png
  - scripts
    - Algorithms
      - dijkstra.js
    - Data Structures
      - graph.js
      - quadtree.js
      - rect.js
    - Routes
      - customRoute.js
      - mainRoutes.js
      - route.js
      - routeMarkers.js
      - Route Generation
        - closestVertex.js
        - generateRoute.js
        - getNodes.js
        - latlngOffsetToKm.js
    - UI
      - leftSidebar.js
      - rightSidebar.js
      - warning.js
    - CycleAPI
      - cycleAPI.js
    - MapsAPI
      - drawPolylines.js
      - mapsAPI.js
      - markers.js

The help page has no javascript - it only uses html and css to display the information and so does not require a script folder or an index.js file.

The main page, however, has many different functionalities that had to be programmed, and so it has been split up into files extensively so that
code editing is easier.

Here is a description of each javascript file.

### index.js
index.js is simply the startup of the program. it invokes the google maps api through a function call, which starts the entire flow of the
javascript in the program.

### leftSidebar.js
leftSidebar.js is inside the UI module, and contains a single function used to open and close the left sidebar. It adds pre-defined CSS
animations to the sidebar using dynamic DOM manipulation. It is called from a button's onclick attribute defined in the HTML.

### rightSidebar.js
rightSidebar.js is inside the UI module, and contains two functions - one used to open and close the sidebar, and the other used to dynamically
add the appropriate route data to the view route menu.

### warning.js
warning.js is inside the UI module, and contains a single function used to create a warning alert panel in case of an error the user needs to be
notified of.

### cycleAPI.js
cycleAPI.js is inside of the CycleAPI module, and contains two functions - one that simply queries and receives the JSON from the Bristol OpenData
API, and the other converts the JSON received into an array of "routes", which are generic objects containing the route properties and the geometry
converted to an array of LatLng object literals that the google maps API can use.

### mapsAPI.js
mapsAPI.js is inside of the MapsAPI module, and contains a function used to startup the google maps API. This adds a script dynamically to the DOM,
containing our API key for the google maps API, and after the API is successfully queried it loads another function responsible for creating the map element.
This map element limits the user to the Bristol and south Gloucestershire area. Before the map is loaded, the user is prompted to allow permission for their
geolocation so that the map can be centered on them. If they do not allow it, they are centered on UWE. Finally, the function drawing the Bristol OpenData
routes is called, passing the program flow to another module.

### drawPolylines.js
drawPolylines.js is inside of the MapsAPI module, and contains two functions. One is treated as a private function that directly creates a google maps polyline
object using the polylineoptions passed to it, and the other acts as the function to call when creating a polyline. It defines specific presets for the polyline
for all the different cases that will use them.

### markers.js
markers.js is inside of the MapsAPI module, and contains a single function that is responsible for creating google maps advancedmarkerelements from a set of presets.
the marker object of type "advancedmarkerelement" is returned after it is created.

### routeMarkers.js
routeMarkers.js is isnide of the Routes module, and contains functions that handle the placement of route markers when generating a route. 

### route.js
route.js is inside of the Routes module, and contains the route class. The route class is used to create route instances that store the properties of each route, as well
as the google maps polyline that display them. they have functions to handle hovering over the route and clicking it.

### mainRoutes.js
mainRoutes.js is inside of the Routes module, and contains a single, simple function that simply calls the previously mentioned function that decodes the cycleAPI JSON, iterates
through each route, creating a new route instance from route.js.

### customRoute.js
customRoute.js is inside of the Routes module, and contains the customRoute class. This class is used similarly to the route class from route.js,
however instead it has the extra functionality required for the custom routes - markers showing the beginning and end point, as well as it lacking 
all the properties that a usual route would (difficulty, etc).

### graph.js
graph.js is inside of the Data Structures module, and contains a class definition for a graphNode. These graphNodes are to be used as the vertices of
a route, and so it stores which route it is contained within, an array of its edges and other properties that are necessary in a dijkstra's algorithm,
such as the previous node visited.

### rect.js
rect.js is inside of the Data Structures module, and contains a class definition for a 'rect'. A rect in this case is simply a rectangle, which has functions
to check if another rectangle is intersecting it, or if a point is contained within it. This is necessary for the next class definition.

### quadtree.js
quadtree.js is inside of the Data Structures module, and makes use of the previously mentioned rect class. This data structure is used to perform optimised
searches for nearby graph nodes, which greatly optimises the creation of the graph (and the adding of edges to nearby nodes) by a factor of 10, as this way
it uses linear time complexity compared to the polynomial time complexity found in a nested for loop alternative.

### dijkstra.js
dijkstra.js is inside of the Algorithms module, and contains a single function that performs a dijkstra's shortest path algorithm on a graph given a start and
end node.

### closestVertex.js
closestVertex.js is inside of the Route Generation submodule of the Route module, and does a search for the nearest route vertex to a location passed to the
function.

### getNodes.js
getNodes.js is inside of the Route Generation submodule, and it contains a single function that converts the routes into a graph, given the start and end point.

### latlngOffsetToKm.js
latlngOffsetToKm.js is inside of the Route Generation submodule, and it contains a single function that uses Haversine formula to convert two latitude and longitude
positions, which are used by the google maps API, into the distance between them in kilometers.

### generateRoute.js
generateRoute.js is inside of the Route Generation submodule, and contains two functions. One of the functions acts as the entry point, by checking that
the user-placed markers are valid (have been placed to begin with). If this is valid, the other method is called, which begins route generation. The route generation
algorithm works by finding the nearest vertex to the start and end markers. The routes are then converted to a large graph of connected edges and the dijkstra
is performed on this graph. Finally, the path is returned, if there is a valid path between them, and drawn to the screen via the customRoute class.

## Table of JSLint Warnings for each javascript file

*Note that JSLint was configured to the browser environment, all global variables were entered and with settings to allow for loops, the "this" keyword and "complex arrow functions"*.

| **JS File**                    | **JSLint Warnings** |  
| index.js                       |  0                  |
| leftSidebar.js                 |  0                  |
| rightSidebar.js                |  0                  |
| warning.js                     |  0                  |
| cycleAPI.js                    |  2                  |
|                                |  "Expected ; and saw 'of'" at "for (feature of route.features) {" (25:18) |
|                                |  "Line is longer than 80 characters" at "let url = (the fetch url)" (6:1) |
| mapsAPI.js                     |  2                  |
|                                |  "Line is longer than 80 characters" at "scriptElement.src = (google maps api link)" (16:1) |
|                                |  "Line is longer than 80 characters" at "googleMapsObject = new google.maps.Map(document.getElementById("map", mapProperties))" (53:1) |
| drawPolylines.js               |  0                  |
| markers.js                     |  0                  |
| route.js                       |  11                 |
|                                |  "Expected ; and instead saw 'of'" at "for (path of routeDataJSON.route) {" (30:21) | 
|                                |  "Expected ; and instead saw 'route'" at "class route {" (6:6) | 
|                                |  "Expected ; and instead saw '{'" at "class route {" (6:12) | 
|                                |  "Naked block" at "class route {" (6:13) | 
|                                |  "Expected ; and instead saw '{'" at "constructor(routeDataJSON) {" (8:31) | 
|                                |  "Naked block" at "constructor(routeDataJSON) {" (8:32) |
|                                |  "Expected ; and instead saw 'this'" at "    }" (18:9) |
|                                |  "Expected 'for' to be in a function" at "for (path of routeDataJSON.route" (30:13) | 
|                                |  "Line is longer than 80 characters" at "this.highlights = []; //stores the higlights when a polyline is selected" (41:4) | 
|                                |  "Line is longer than 80 characters" at "polyline.addListener("mouseover", function() { this.parent.highlight(); });" (50:1) |
|                                |  "Line is longer than 80 characters" at "polyline.addListener("mouseout", function() { this.parent.unhighlight(); });" (51:1) |
| routeMarkers.js                |  0                  |
| mainRoutes.js                  |  1                  |
|                                |  "Expected ; and instead saw 'of'" at "for (routex of routeArray) {" (6:17) | 
| customRoute.js                 |  11                 |
|                                |  "Unexpected ')'" at "delete() {" (30:12) |
|                                |  "Expected ; and instead saw 'customRoute'" at "class customRoute {" (6:6) |
|                                |  "Expected ; and instead saw '{'" at "class customRoute {" (6:18) |
|                                |  "Naked block" at "class customRoute {" (6:19) |
|                                |  "Expected ; and instead saw '{'" at "constructor(path) {" (8:22) |
|                                |  "Naked block" at "constructor(path) {" (8:23) |
|                                |  "Line is longer than 80 characters" at "_setMarker(this.path\[this.path.length-1\], "intermediate");" (15:1) |
|                                |  "Expected ; and instead saw '{'" at "hide() {" (18:11) |
|                                |  "Naked Block" at "hide() {" (18:12) |
|                                |  "Expected '; and instead saw {" at "show() {" (24:11) |
|                                |  "Naked block" at "show() {" (24:21) |
| graph.js                       |  9                  |
|                                |  "Unexpected expression 'class' in statement position" at "class graphNode {" (3:1) | 
|                                |  "Expected ; and instead saw 'graphNode'" at "class graphNode {" (3:6) |
|                                |  "Unexpected expression 'graphNode' in statement position" at "class graphNode {" (3:7) |
|                                |  "Expected ; and instead saw '{'" at "class graphNode {" (3:16) |
|                                |  "Naked block" at "class graphNode {" (3:17) |
|                                |  "Expected ; and instead saw '{'" at "constructor(LatLngLiteral, route) {" (5:38) |
|                                |  "Naked block" at "constructor(LatLngLiteral, route) {" (5:39) |
|                                |  "Expected ; and instead saw '{'" at "addEdge(connectedNode) {" (14:27) |
|                                |  "Naked block" at "addEdge(connectedNode) {" (14:28) |
| rect.js                        |  21                 |
|                                |  "Unexpected expression 'class' in statement position" at "class latlngRect {" (3:1) |
|                                |  "Expected ; and instead saw 'latlngRect'" at "class latlngRect {" (3:6) |
|                                |  "Unexpected expression 'latlngRect' in statement position" at "class latlngRect {" (3:7) |
|                                |  "Expected ; and instead saw '{'" at "class latlngRect {" (3:17) |
|                                |  "Naked block" at "class latlngRect {" (3:18) |
|                                |  "Expected ; and instead saw '{'" at "constructor(lat, lng, height, width) {" (5:41) |
|                                |  "Naked block" at "constructor(lat, lng, height, width) {" (5:42) |
|                                |  "Expected ; and instead saw '{'" at "contains(LatLngLiteral) {" (10:28) |
|                                |  "Naked block" at "contains(LatLngLiteral) {" (10:29) |
|                                |  "Expected 'return' to be in a function" at "    return {" (11:9) |
|                                |  "Unreachable '{'" at "intersects(rect2) {" (19:15) |
|                                |  "Expected ; and instead saw '{'" at "intersects(rect2) {" (19:22) |
|                                |  "Naked block" at "intersects(rect2) {" (19:23) |
|                                |  "Expected 'return' to be in a function" at "if (this.lat < rect2.lat - rect2.height) { return false; }" (20:52) |
|                                |  "Expected 'return' to be in a function" at "if (this.lat - this.height > rect2.lat) { return false; }" (21:51) |
|                                |  "Expected 'return' to be in a function" at "if (this.lng > rect2.lng + rect2.width) { return false; }" (22:51) |
|                                |  "Expected 'return' to be in a function" at "if (this.lng + this.width < rect2.lng) { return false; }" (23:50) |
|                                |  "Expected 'return' to be in a function" at "    return true;" (24:9) |
|                                |  "Unreachable '{'" at "draw() {" (28:9) |
|                                |  "Expected ; and instead saw '{'" at "draw() {" (28:11) |
|                                |  "Naked block" at "draw() {" (28:12) |
| quadtree.js                    |  39                 |
|                                |  "Unexpected expression 'class' in statement position" at "class quadTree {" (3:1) |
|                                |  "Expected ; and instead saw 'quadTree'" at "class quadTree {" (3:6) |
|                                |  "Unexpected expression 'quadTree' in statement position" at "class quadTree {" (3:7) |
|                                |  "Expected ; and instead saw '{'" at "class quadTree {" (3:15) |
|                                |  "Naked block" at "class quadTree {" (3:16) |
|                                |  "Bad assignment to 'capacity'" at "constructor(boundary, capacity=4) {" (5:27) |
|                                |  "Unexpected statement '=' in expression position" at "constructor(boundary, capacity=4) {" (5:35) |
|                                |  "Expected ' and instead saw '{'" at "constructor(boundary, capacity=4) {" (5:38) |
|                                |  "Naked block" at "constructor(boundary, capacity=4) {" (5:39) |
|                                |  "Expected ; and instead saw '{'" at "subdivide() {" (13:16) |
|                                |  "Naked block" at "subdivide() {" (13:17) |
|                                |  "Line is longer than 80 characters" at "let topleftRegion = new latlngRect(this.boundary.lat, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);" (14:1) |
|                                |  "Unexpected 'new'" at "let topleftRegion = new latlngRect(this.boundary.lat, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);" (14:29) |
|                                |  "Line is longer than 80 characters" at "let bottomleftRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);" (15:1) |
|                                |  "Unexpected 'new'" at "let bottomleftRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);" (15:32) |
|                                |  "Line is longer than 80 characters" at "let bottomrightRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);" (16:1) |
|                                |  "Unexpected 'new'" at "let bottomrightRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);" (16:33) |
|                                |  "Line is longer than 80 characters" at "let toprightRegion = new latlngRect(this.boundary.lat, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);" (17:1) |
|                                |  "Unexpected 'new'" at "let toprightRegion = new latlngRect(this.boundary.lat, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);" (17:30) |
|                                |  "Unexpected 'new'" at "this.topleft = new quadTree(topleftRegion, this.capacity);" (19:24) |
|                                |  "Unexpected 'new'" at "this.bottomleft = new quadTree(topleftRegion, this.capacity);" (20:27) |
|                                |  "Unexpected 'new'" at "this.bottomright = new quadTree(topleftRegion, this.capacity);" (21:28) |
|                                |  "Unexpected 'new'" at "this.topright = new quadTree(topleftRegion, this.capacity);" (22:25) |
|                                |  "Expected ; and instead saw '{'" at "insertNode(node) {" (27:21) | 
|                                |  "Naked block" at "insertNode(node) {" (27:22) | 
|                                |  "Expected 'return' to be in a function" at "if (!this.boundary.contains(node.latlng)) {return;}" (28:52) |
|                                |  "Expected === and instead saw ==" at "if (this.nodes.length === this.capacity" { this.subdivide(); }" (32:35) | 
|                                |  "Expected ; and instead saw '{'" at "getNearbyNode(node, range) {" (41:32) | 
|                                |  "Naked block" at "getNearbyNode(node, range) {" (41:33) | 
|                                |  "Line is longer than 80 characters" at "range = new latlngRect(node.latlng.lat + range_height/2, node.latlng.lng - range_width/2, range_height, range_width);" (49:1) |
|                                |  "Bad assignment to 'range'" at "range = new latlngRect(node.latlng.lat + range_height/2, node.latlng.lng - range_width/2, range_height, range_width);" (49:13) |
|                                |  "Unexpected 'new'" at "range = new latlngRect(node.latlng.lat + range_height/2, node.latlng.lng - range_width/2, range_height, range_width);" (49:21) |
|                                |  "Line is longer than 80 characters" at "found = found.concat(this.bottomleft.getNearbyNodes(node, range));" (58:1) |
|                                |  "Line is longer than 80 characters" at "found = found.concat(this.bottomright.getNearbyNodes(node, range));" (59:1) |
|                                |  "Expected 'return' to be in a function" at "    return found;" (63:9) | 
|                                |  "Unreachable '{'" at "draw() {" (67:9) | 
|                                |  "Expected ; and instead saw '{;" at "draw() {" (67:11) | 
|                                |  "Naked block" at "draw() {" (67:12) | 
| dijkstra.js                    |  3                  |
|                                |  "Unexpected 'let'" at "for (let i = 0; i < nextNodes.length; i++) {" (17:18) |
|                                |  "Line is longer than 80 characters" at "if (!startNode || !endNode) { console.log("Warning: one or more nodes are null"); }" (6:1) |
|                                |  "Line is longer than 80 characters" at "    let newDistance = currentNode.distance + currentNode.edges[i].weight;" (45:1) |
| closestVertex.js               |  1                  |
|                                |  "Expected ; and instead saw 'of'" at "for (route of routeArray) {" (7:15) |
| getNodes.js                    |  6                  |
|                                |  "Unexpected 'let'" at "for (let i = 0; i < mainRouteList.length; i++) {" (12:10) |
|                                |  "Line is longer than 80 characters" at "    // declared here so that nodes between route are not treated as previous" (17:1) |
|                                |  "Line is longer than 80 characters" at "    if (vertex.lat == startPos.lat && vertex.lng == startPos.lng) { startNode = node; }" (26:1) |
|                                |  "Line is longer than 80 characters" at "    if (vertex.lat == endPos.lat && vertex.lng == endPos.lng) { endNode = node; }" (27:1) |
|                                |  "Line is longer than 80 characters" at "    if (nearbyNode.route.type != "MultiLineString" && nearbyNode.route.id === node.route.id) { continue; }" (48:1) |
|                                |  "Line is longer than 80 characters" at "    "if (latlngOffsetToKm(nearbyNode.latlng, node.latlng) < (node.route.type === "MultiLineString" ? validEdgeDistanceMultiLine : validEdgeDistance)) { (49:1) |
| latlngOffsetToKm.js            |  4                  |
|                                |  "Expected one space between '=' and '2'" at "   2 * earthRadius *" (14:9) |
|                                |  "Expected one space between '*' and 'Math'" at "Math.asin(Math.sqrt(Math.pow((Math.sin((lat2 - lat1) / 2)), 2) +" (15:9) |
|                                |  "Expected one space between '+' and 'Math'" at "Math.cos(lat1) * Math.cos(lat2) *" (16:9) |
|                                |  "Expected one space between '*' and 'Math'" at "Math.pow((Math.sin((lng2 - lng1) / 2)), 2)));" (17:9) |
| generateRoute.js               |  1                  |
|                                |  "Expected ; and instead saw 'of'" at "for (node of shortestNodePath) {" (33:15) |


## Software Architecture
The system mainly uses a functional approach to problems, decomposing solutions into single functions that are easier to edit, use and maintain. Basic object-oriented
ideas are used for data structures and routes, where classes are used to contain their related attributes and methods. The Bristol OpenData is queried
as a REST API, and the Google Maps API uses REST by dynamically loading its javascript with an API key embedded in a HTTP sourced script tag.

![Component Diagram](images/component.png)

## Bristol Open Data API
There is a single query to Bristol Open Data API that fetches all the data needed for the entirety of the webapp's runtime. It makes a basic query to the API without options,
and it posts all the route properties and geometry. All of the data received is used to draw routes and display their properties to the user, and this information is not
subject to change, so this is sufficient for the program.

![UML Class Diagram](images/bristolOpenDataQuery.png)

# User guide

## How-to 1: Generate Routes (UC1)

Step 1: Open the generate route menu by clicking the "generate" button in the bottom-left corner of the map.
![Open Generate Menu Screenshot](images/how-to/generate1.png)

Step 2: Click on the start marker button to allow you to place the start marker.
![Click Start Marker Screenshot](images/how-to/generate2.png)

Step 3: Place the start marker in the desired location on the map. This will be where you want your route to begin.
![Place Start Marker Screenshot](images/how-to/generate3.png)

Step 4: Click on the end marker button to allow you to place the end marker.
![Click End Marker Screenshot](images/how-to/generate4.png)

Step 5: Place the end marker in the desired location on the map. This will be where you want your route to finish.
![Place End Marker Screenshot](images/how-to/generate5.png)

Step 6: Click on the generate button in the generate route menu to begin route generation.
![Begin Generation Screenshot](images/how-to/generate6.png)

Step 7: View the route that has been generated as a line on the map, and plan your next journey!
![View Generated Route Screenshot](images/how-to/generate7.png)

## How-to 2: View Routes (UC2)

Step 1: Select a route you'd like to view more about. You can see individual routes by hovering over them, and they will
be highlighted. If there are many routes in one place and they overlap a lot, zoom in to allow the hover functionality to
make it easier for you to select the one you desire.
![Select Route](images/how-to/view1.png)

Step 2: Click on the route to open up the view route menu.
![Click Route](images/how-to/view2.png)

Step 3: Look at the information provided to you and decide whether or not the route is for you!
![View Route](images/how-to/view3.png)
