// Written by Joe

// globals ========================
let g_customRoute; // the current custom route on the map

/*
    customRoute:
    parameters
    - path : Array (an array of generic js objects of latitude and longitude coordinates representing the custom route)
    algorithm:
        creates a customRoute instance that contains attributes of its route vertices, its start and end markers and the
        polyline representing the route. contains functions to show and hide the route from the nap, and to delete the route.
*/
class customRoute {

    constructor(path) {
        this.path = path;

        g_customRoute = this;

        this.polyline = drawPolyline(this.path, "custom");
        this.startMarker = _setMarker(this.path[0], "intermediate");
        this.endMarker = _setMarker(this.path[this.path.length-1], "intermediate");
    }

    /*
        hide:
        algorithm:
            uses the setMap function to hide its polyline and marker attributes from the map
    */
    hide() {
        this.polyline.setMap(null);
        this.startMarker.setMap(null);
        this.endMarker.setMap(null);
    }

    /*
        hide:
        algorithm:
            uses the setMap function to show its polyline and marker attributes on the map
    */
    show() {
        this.polyline.setMap(googleMapsObject);
        this.startMarker.setMap(googleMapsObject);
        this.endMarker.setMap(googleMapsObject);
    }

    /*
        hide:
        algorithm:
            uses the hide function to not show itself on the map, and removes it from the global
            custom route variable. garbage colletion will remove this instance from memory, as it will
            not be referenced anywhere.
    */
    delete() {
        // garbage collection will do its thing
        g_customRoute = null;
        this.hide();
    }
}
