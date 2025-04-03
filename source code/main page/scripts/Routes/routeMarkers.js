// Written by Joe

// globals =====================
let startMarker;
let endMarker;
let startMarkerMode = false;
let endMarkerMode = false;

/* visual marker logic */

/*
    deleteStartMarker:
    algorithm:
       if there is a start marker instance stored in the associated global,
       it will be set to null and its map attriute will be set to null, removing
       it from the map and allowing garbage collection to clear it from memory.
*/
function deleteStartMarker() {
    if (startMarker) {
        startMarker.map = null;
        startMarker = null;
    }
}

/*
    deleteEndMarker:
    algorithm:
       if there is a end marker instance stored in the associated global,
       it will be set to null and its map attriute will be set to null, removing
       it from the map and allowing garbage collection to clear it from memory.
*/
function deleteEndMarker() {
    if (endMarker) {
        endMarker.map = null;
        endMarker = null;
    }
}

/*
    setStartMarker:
    parameters:
    - LatLng : object [LatLngLiteral] (a generic js object storing the lat and lng coordinates of the desired start marker position)
    algorithm:
        creates a marker instance of the "start" preset and stores it, deleting the current one if there is one.
*/
function setStartMarker(LatLng) {
    deleteStartMarker();
    startMarker = _setMarker(LatLng, "start");
}

/*
    setEndMarker:
    parameters:
    - LatLng : object [LatLngLiteral] (a generic js object storing the lat and lng coordinates of the desired start marker position)
    algorithm:
        creates a marker instance of the "end" preset and stores it, deleting the current one if there is one.
*/
function setEndMarker(LatLng) {
    deleteEndMarker();
    endMarker = _setMarker(LatLng, "end");
}

/*
    clearRouteMarkers:
    algorithm:
        uses the deleteStartMarker and deleteEndMarker functions to clear all route
        markers. is convenient instead of having to call both functions.
*/
function clearRouteMarkers() {
    deleteStartMarker();
    deleteEndMarker();
}

/* marker mode logic */

/*
    activateStartMarkerMode:
    algorithm:
         calls the activate deactivateMarkerMode function to ensure the opposite marker type
         mode is currently false. then sets the start marker mode global to true.
*/
function activateStartMarkerMode() {
    deactiveMarkerMode();
    startMarkerMode = true;
}

/*
    activateEndMarkerMode:
    algorithm:
         calls the activate deactivateMarkerMode function to ensure the opposite marker type
         mode is currently false. then sets the start marker mode global to true.
*/
function activateEndMarkerMode() {
    deactiveMarkerMode();
    endMarkerMode = true;
}

/*
    deactivateMarkerMode:
    algorithm:
        simply sets both marker mode globals to false.
*/
function deactiveMarkerMode() {
    endMarkerMode = false;
    startMarkerMode = false;
}
