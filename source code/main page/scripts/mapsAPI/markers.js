// Written by Joe

/*
    _setMarker:
    parameters:
    - LatLng : object [LatLngLiteral] (a generic js object containing lat and lng coordinates referring to the desired position of the marker)
    - markerType : string ["start" by default] (the marker preset desired)
    algorithm:
        creates and returns a google maps AdvancedMarkerElement instance based on the preset provided. If no preset is provided, "start" is chosen.
*/
function _setMarker(LatLng, markerType="start") {
    let color_dark;
    let color_light;
    let name;
    switch (markerType) {
        case("end"):
            color_dark = "#00AA00";
            color_light = "#00FF00";
            name = "Destination";
            break;

        case("intermediate"):
            color_dark = "#0000AA";
            color_light = "#0000FF";
            name = "Intermediate point";
            break;

        default: // case start or undefined
            color_dark = "#AA0000";
            color_light = "#FF0000";
            name = "Start";
    }

    const pinElement = new google.maps.marker.PinElement({
        background: color_light,
        borderColor: color_dark,
        glyphColor: color_dark
    });

    return new google.maps.marker.AdvancedMarkerElement({
        content: pinElement.element,
        map: googleMapsObject,
        position: LatLng,
        title: name
    });
}
