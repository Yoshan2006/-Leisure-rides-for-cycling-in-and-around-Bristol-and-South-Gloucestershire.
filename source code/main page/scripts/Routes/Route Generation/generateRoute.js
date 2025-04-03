// Written by Joe

/*
    startRouteGen:
    algorithm:
        starts route generation by deleting the current generated route if there is one, and
        performing a check if both markers have been placed. if so, the route generation function
        is called. Otherwise, the user is warned using the warn function of this.
*/
function startRouteGen() {
    if (g_customRoute) {
        g_customRoute.delete();
    }
    if (startMarker && endMarker) {
        const startPos = {
            lat: startMarker.position.lat,
            lng: startMarker.position.lng
        };

        const endPos = {
            lat: endMarker.position.lat,
            lng: endMarker.position.lng
        };

        generateRoute(startPos, endPos);
    } else {
        warn("Both markers need to be set to generate a route!");
    }
}

/*
    generateRoute:
    parameters:
    - startPos : object [LatLngLiteral] (a generic js object containing lat and lng coordinates to the start position)
    - endPos : object [LatLngLiteral] (a generic js object containing lat and lng coordinates to the end position)
    algorithm:
       uses the closest vertex function to find the closest vertices of routes to the start and end position. then,
       the routes are converted into graphs, and the start and end positions are returned as graphNode instances. these
       are then passed to the dijkstra function, which returns a path of the shortest sequence of graphNode instances from the start
       position to the end position. Finally, this position of each node is stored in an array, and if this array is above length 0
       (if an array was returned and the dijkstra's succeeded), a customRoute instance is created to display the route. Otherwise,
       the user is warned that a path could not be found.
*/
function generateRoute(startPos, endPos) {
    let closestToStart = closestVertex(startPos);
    let closestToEnd = closestVertex(endPos);

    const [startNode, endNode] = getNodes(closestToStart, closestToEnd);
    const shortestNodePath = dijkstra(startNode, endNode);

    let latlngPath = [];
    let node;
    for (node of shortestNodePath) {
        latlngPath.push(node.latlng);
    }

    if (latlngPath.length > 0) {
        new customRoute(latlngPath);
        transitionLeftSidebar("close");
    } else {
        warn("Cannot find path connecting start and end point.");
    }
}
