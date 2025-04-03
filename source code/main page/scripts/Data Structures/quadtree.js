// Written by Joe

    /*
        quadTree:
        parameters:
        - boundary : rect (the rect instance that forms the boundary of the quadtree)
        - capacity : int (the number of points allowed in the quadtree before it splits)
        class definition:
            a quadtree data structure that has methods to subdivide, insert nodes into it and
            check for all the nodes within a certain distance of another one
    */
class quadTree {

    constructor(boundary, capacity=4) {
        this.boundary = boundary;
        this.capacity = capacity;

        this.divided = false;
        this.nodes = [];
    }

    /*
        subdivide:
        algorithm:
            splits the quadtree into four smaller quadtree instances within itself that are stored
            as children within respective attribute variables.
    */
    subdivide() {
        let topleftRegion = new latlngRect(this.boundary.lat, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);
        let bottomleftRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng, this.boundary.height/2, this.boundary.width/2);
        let bottomrightRegion = new latlngRect(this.boundary.lat-this.boundary.height/2, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);
        let toprightRegion = new latlngRect(this.boundary.lat, this.boundary.lng+this.boundary.width/2, this.boundary.height/2, this.boundary.width/2);

        this.topleft = new quadTree(topleftRegion, this.capacity);
        this.bottomleft = new quadTree(bottomleftRegion, this.capacity);
        this.bottomright = new quadTree(bottomrightRegion, this.capacity);
        this.topright = new quadTree(toprightRegion, this.capacity);

        this.divided = true;
    }

    /*
        insertNode:
        parameters:
        - node : graphNode (a graphNode instance to be input into the quadTree)
    */
    insertNode(node) {
        if (!this.boundary.contains(node.latlng)) {return;}

        if (!this.divided) {
            this.nodes.push(node);
            if (this.nodes.length == this.capacity) { this.subdivide(); }
        } else {
            this.topleft.insertNode(node);
            this.bottomleft.insertNode(node);
            this.bottomright.insertNode(node);
            this.topright.insertNode(node);
        }
    }

    getNearbyNodes(node, range) {
        let found = [];
        // inits a range of 8x8m rect around the node

        // this range is not big enough to find all the not-so-close nodes
        if (!range) {
            let range_height = 0.016;
            let range_width = Math.cos(node.latlng.lat) * 0.032;
            range = new latlngRect(node.latlng.lat + range_height/2, node.latlng.lng - range_width/2, range_height, range_width);
        }

        // get all points within quadtree subdivisions that intersect with the search range
        // and add them to the found array
        if (this.boundary.intersects(range)) {
            found = found.concat(this.nodes);
            if (this.divided) {
                found = found.concat(this.topleft.getNearbyNodes(node, range));
                found = found.concat(this.bottomleft.getNearbyNodes(node, range));
                found = found.concat(this.bottomright.getNearbyNodes(node, range));
                found = found.concat(this.topright.getNearbyNodes(node, range));
            }
        }
        return found;
    }

    // debug function (draws the entire quadtree and all its children)
    draw() {
        this.boundary.draw();
        if (this.divided) {
            this.topleft.draw();
            this.bottomleft.draw();
            this.bottomright.draw();
            this.topright.draw();
        }
    }
}
