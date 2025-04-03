// Written by Joe

/*
    drawPolyline:
    parameters:
    - LatLngArray : Array (an array containing js generic objects containing lat lng coordinates. this represents a route)
    - type : string ["main" by default] (the preset of the poltline)
    algorithm:
       creates a js generic optionals object containing optional attributes for a google maps polyline instance based on the preset given. 
       if none is provided, the "main" preset is chosen by default. the _setPolyline function is then called, and the polyline is returned.
*/
function drawPolyline(LatLngArray, type="main") {
    let opts = {
        path: LatLngArray
    };

    const polylineDotIcon = {
        fillColor: "#000000",
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3.5,
        strokeColor: "#000000"
    };

    switch (type) {
        case "main":
            opts.strokeColor = "#FF0000";
            opts.strokeWeight = 3;
            break;

        case "highlight_main":
            opts.strokeColor = "#000000";
            opts.strokeWeight = 10;
            opts.zIndex = -1;
            break;

        case "hitbox_main":
            opts.strokeOpacity = 0;
            opts.strokeWeight = 100;
            break;

        case "custom":
            opts.strokeColor = "#0000FF";
            opts.strokeWeight = 10;
            break;

        case "off_road":
            opts.strokeColor = "#000000";
            opts.strokeWeight = 4;
            opts.icons = [{
                icon: polylineDotIcon,
                offset: "0",
                repeat: "15px"
            }];
            break;
    }
    return _setPolyline(opts);
}

/*
    _setPolyline:
    parameters:
    - opts : object [PolyLineOptionals] (a generic js object consisting of optionals for the google maps polyline class)
    algorithm:
        creates a polyline instance with the optionals provided, and puts it on the map and returns it.
*/
function _setPolyline(opts) {
    let line = new google.maps.Polyline(opts);
    line.setMap(googleMapsObject);
    return line;
}
