// Written by Joe

/*
    latlngRect:
    parameters:
    - lat : float (the topmost latitude of the rectangle)
    - lng : float (the leftmost longitude of the rectangle)
    - height : float (the height of the rectangle in latitude)
    - width : float (the width of the rectangle longitude)
    class description
        simply is a way of representing a rectangle. is to be used in the
        quadtree definition, and therefore contains methods for checking if a
        point is contained within it, and checking if another rectangle intersects it.
*/
class latlngRect {

    constructor(lat, lng, height, width) {
        this.lng = lng; this.lat = lat;
        this.width = width; this.height = height;
    }
    
    /*
        contains:
        parameters:
        - LatLngLiteral : object (a generic js object containing lat and lng coordinates of a point)
        algorithm:
            checks whether a point is within this rectangle.
    */
    contains(LatLngLiteral) {
        return (
        this.lat > LatLngLiteral.lat &&
        this.lat - this.height < LatLngLiteral.lat &&
        this.lng < LatLngLiteral.lng &&
        this.lng + this.width > LatLngLiteral.lng
        );
    }

    /*
        intersects:
        parameters:
        - rect2 : latlngRect (another latlngRect instance)
        algorithm:
            checks whether another rect intersects this one
    */
    intersects(rect2) {
        if (this.lat < rect2.lat - rect2.height) { return false; }
        if (this.lat - this.height > rect2.lat) { return false; }
        if (this.lng > rect2.lng + rect2.width) { return false; }
        if (this.lng + this.width < rect2.lng) { return false; }
        return true;
    }

    // debug function (draws the rectangle to the map)
    draw() {
        const latlngliteralsarray = [
            {lat: this.lat, lng: this.lng},
            {lat: this.lat, lng: this.lng+this.width},
            {lat: this.lat-this.height, lng: this.lng+this.width},
            {lat: this.lat-this.height, lng: this.lng}
        ];

        const polygon = new google.maps.Polygon({
            fillOpacity: 0,
            paths: latlngliteralsarray,
            strokeColor: "#0000FF",
            strokeOpacity: 1,
            strokeWeight: 10
        });
        polygon.setMap(googleMapsObject);
    }

}

