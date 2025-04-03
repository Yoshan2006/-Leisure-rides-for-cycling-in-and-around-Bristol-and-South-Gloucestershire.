// author: Mihiranga

// globals
let mainRouteList = [];

class route {

    constructor(routeDataJSON) {
        // info for user
        this.info = {
            color: routeDataJSON.colorcode,
            description: routeDataJSON.description,
            difficulty: routeDataJSON.difficulty,
            distance: routeDataJSON.distance,
            maxTime: routeDataJSON.max,
            minTime: routeDataJSON.min,
            name: routeDataJSON.name
        }

        // attributes
        this.id = routeDataJSON.id;
        this.type = routeDataJSON.type;

        // decoding paths into appropriate form
        this.paths = [];
        if (this.type == "LineString") {
             this.paths.push(routeDataJSON.route);
        } else if (this.type == "MultiLineString") {
            let path;
            for (path of routeDataJSON.route) {
                this.paths.push(path);
            }
        }

        // add this to the route list
        mainRouteList[this.id-1] = this;

        // draw and store polylines
        this.polylines = []; // stores all visible polylines of routes
        this.hitboxes = []; // stores invisible mouseover areas for highlighting
        this.highlights = []; // stores the highlights when a polyline is selected
        for (let i = 0; i < this.paths.length; i++) {
            this.polylines.push(drawPolyline(this.paths[i]));
            this.hitboxes.push(drawPolyline(this.paths[i], "hitbox_main"));
            this.hitboxes[i].parent = this;
        }

        // add polyline event listeners
        for (let polyline of this.hitboxes) {
            polyline.addListener("mouseover", function() { this.parent.highlight(); });
            polyline.addListener("mouseout", function() { this.parent.unhighlight(); });
            polyline.addListener("click", function() { this.parent.click(); });
        }
    }

    highlight() {
        let path;
        for (path of this.paths) {
            this.highlights.push(drawPolyline(path, "highlight_main"));
        }
    }

    unhighlight() {
       for (let highlight of this.highlights) {
            highlight.setMap(null);
            this.highlights = [];
       }
    }

    click() {
        if (!rightSidebarOpen) {
            transitionRightSidebar("open");
            updateRightSidebar(this.info);
        }
    }

    hide() {
        let polyline;
        for (polyline of this.polylines) {
            polyline.setMap(null);
        }
    }

    show() {
        let polyline;
        for (polyline of this.polylines) {
            polyline.setMap(googleMapsObject);
        }
    }

    delete() {
        // garbage collection will do its thing
        mainRouteList[id-1] = null;
        this.hide();
    }

}
