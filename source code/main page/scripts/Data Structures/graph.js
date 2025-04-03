// Written by Joe

/*
    graphNode:
    parameters:
    - LatLngLiteral : object (a genertic js object containing position float properties lat and lng)
    - route : route (the route class instance that the vertex the graphNode represents belongs to)
    class description
    forms, alongside other graphNode instances, a connected graph data structure with a function to add
    other nodes as edges, and is to be used in the dijkstra pathfinding algorithm.
*/
class graphNode {

    constructor(LatLngLiteral, route) {
        this.latlng = LatLngLiteral;
        this.edges = [];
        this.route = route;
        this.distance = Infinity;
        this.visited = false;
        this.previous = null;
    }

    addEdge(connectedNode) {
        this.edges[this.edges.length] = {
            node: connectedNode,
            weight: latlngOffsetToKm(this.latlng, connectedNode.latlng)
        };
    }
}
