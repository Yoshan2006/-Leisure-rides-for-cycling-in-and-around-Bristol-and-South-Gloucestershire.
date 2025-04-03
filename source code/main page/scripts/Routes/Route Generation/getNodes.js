// Written by Joe

/*
    getNodes:
    parameters:
    - startPos : object [LatLngLiteral] (a generic js object of lat lng coordinates of the starting position of a dijkstra)
    - endPos : object [LatLngLiteral] (a generic js object of lat lng coordinates of the end position of a dijkstra)
    algorithm:
        this function converts the routes to a connected graph and returns the start and end positions as graphNode instances.
        it starts by creating a rect instance called boundary that contains all routes. then, it creates a quadtree using the rect
        as its boundary. it then iterates through all the vertices of each main route and converts them into graphnodes, adding the previous
        and next vertices in the routes as edges. when the stat and end positions are found within the routes, these particular nodes are stored
        to be returned later. then, the quadtree getNearbyNodes is utilised to efficiently form edges between nearby nodes that are not within
        the same route. finally, the start and end nodes are returned.
        
*/
function getNodes(startPos, endPos) {
    // used for efficiently finding nearby nodes
    // to form edges with
    let boundary = new latlngRect(52, -3.1, 1, 1); // boundary of all routes
    let qt = new quadTree(boundary);

    // convert all vertices to nodes
    // adds edges to previous and next node
    let allGraphRoutes = [];
    for (let i = 0; i < mainRouteList.length; i++) {
        let route = mainRouteList[i];
        allGraphRoutes[i] = [];

        for (let minorRoute of route.paths) {
            // declared here so that nodes between route are not treated as previous
            let previousNode;
            for (let vertex of minorRoute) {
                // create the node and insert into the quadtree
                let node = new graphNode(vertex, route);
                qt.insertNode(node);
                allGraphRoutes[i].push(node);

                // find start and end nodes
                if (vertex.lat == startPos.lat && vertex.lng == startPos.lng) { startNode = node; }
                if (vertex.lat == endPos.lat && vertex.lng == endPos.lng) { endNode = node; }

                // connect to previous node
                if (previousNode) {
                    node.addEdge(previousNode);
                    previousNode.addEdge(node);
                }
                previousNode = node;
            }
        }
    }

    // add edges of nearby nodes
    // old magic distance = 0.08
    let validEdgeDistance = 0.01;
    let validEdgeDistanceMultiLine = 0.03;
    for (let i = 0; i < allGraphRoutes.length; i++) {
        for (let node of allGraphRoutes[i]) {
            let nearbyNodes = qt.getNearbyNodes(node);
            // add edges
            for (let nearbyNode of nearbyNodes) {
                if (nearbyNode.route.type != "MultiLineString" && nearbyNode.route.id === node.route.id) { continue; } // skip if same route
                if (latlngOffsetToKm(nearbyNode.latlng, node.latlng) < (node.route.type === "MultiLineString" ? validEdgeDistanceMultiLine : validEdgeDistance)) {
                    node.addEdge(nearbyNode);
                    nearbyNode.addEdge(node);
                }
            }
        }
    }
    return [startNode, endNode];
}
