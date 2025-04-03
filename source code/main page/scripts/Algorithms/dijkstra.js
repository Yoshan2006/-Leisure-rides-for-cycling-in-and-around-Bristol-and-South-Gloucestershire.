// Written by Joe

/*
    dijkstra:
    parameters:
    - startNode : graphNode (the node that acts as the starting position)
    - endNode: graphNode (the node to find a path to)
    algorithm:
    performs a graph traversal search algorithm, calculating the distances
    between nodes and storing the shortest paths as previous nodes until the final
    node is either found or cannot be found within the graph.
*/
function dijkstra(startNode, endNode) {
    // null check on input nodes
    if (!startNode || !endNode) { console.log("Warning: one or more nodes are null"); }

    // ordered such that next shortest distance is at index 0
    let nextNodes = [];

    // function to add nodes to the list in order of current distance from node
    let addToNextNodes = (node) => {
        if (nextNodes.length == 0) {
            nextNodes[0] = node;
        } else {
            let nodeAdded = false;
            for (let i = 0; i < nextNodes.length; i++) {
                if (nextNodes[i].distance > node.distance) {
                    nextNodes.splice(i, 0, node);
                    nodeAdded = true;
                    break;
                }
            }
            if (!nodeAdded) { nextNodes[nextNodes.length] = node; }
        }
    }

    // function to remove and return the final node from the list
    let popFromNextNodes = (idx) => {
        let temp = nextNodes[idx];
        nextNodes.splice(idx, 1);
        return temp;
    }

    // find previous node and distances for each node to the final node
    // iterate through every node, add all paths to the shortest path next queue
    startNode.distance = 0;
    let allEdgesExplored = false;
    let currentNode = startNode;
    while (!allEdgesExplored) {

        // update distances and previous node for each adjacent node
        for (let i = 0; i < currentNode.edges.length; i++) {
            if (!currentNode.edges[i].node.visited) {
                let newDistance = currentNode.distance + currentNode.edges[i].weight;
                if (newDistance < currentNode.edges[i].node.distance) {
                    currentNode.edges[i].node.distance = newDistance;
                    currentNode.edges[i].node.previous = currentNode;
                    addToNextNodes(currentNode.edges[i].node);

                    // debug: draw the dijkstra
                    let debugpath = [
                        currentNode.latlng,
                        currentNode.edges[i].node.latlng,
                    ];
                    //new customRoute(debugpath);

                    // check if it's the final node
                    if (currentNode.edges[i].node == endNode) {
                        var finalNode = currentNode.edges[i].node;
                    }
                }
            }
        }

        currentNode.visited = true;
        currentNode = popFromNextNodes(0);
        if (!currentNode) {
            allEdgesExplored = true;
        }

    }

    // trace the path back
    let path = [], node = finalNode;
    while (node) {
        path.push(node);
        node = node.previous;
    }
    return path.reverse();
}
