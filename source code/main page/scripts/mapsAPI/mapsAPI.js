// Written by Joe

// globals ==================
let googleMapsObject;
const defaultCoordinates = {
    lat: 51.50081315558437,
    lng: -2.5465649388591314
}; // UWE

/*
    loadMapsAPI:
    algorithm:
        sets the window instance's initMap property to the createMap function. this property does not yet exist,
        but the google maps API will try to set one, which we override to call our own function. then, a script element
        is created dynamically, which sources the google maps API with HTTP. this is then added to the DOM, and it is
        error handled in case the link does not work with a quick fetch request, warning the user if anything doesn't work.
*/
function loadMapsAPI() {
    // assign maps API entry function name
    window.initMap = createMap;

    // create script in DOM to import google maps js API
    let scriptElement = document.createElement("script");
    scriptElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtmBw-KaXge42Si7hvcmk2kLOqdmgxpQk&loading=async&callback=initMap&libraries=marker";
    scriptElement.async = true;
    document.head.appendChild(scriptElement);

    // make a fetch request to see if the URL used is valid
    // (which therefore tests for connectivity to the google maps js api)
    fetch(scriptElement.src)
        .then((data) => {
            if (!data) { // if promise returns null
                warn("Could not connect to Google Maps");
            }
        })
        .catch(() => { // if promise returns error
            warn("Could not connect to Google Maps");
        });
}

/*
    createMap:
    algorithm:
        creates a set of map properties and uses async await to attempt to receive the user's geolocation.
        the map is then created, stored in a global and onclick events are added for when markers are to be
        placed in the generate route menu. after this is done, the createMainRoutes function is called to begin
        placing routes on the map.
*/
async function createMap() {
    const bristolAreaBounds = {
        east: -1.92,
        north: 51.78,
        south: 51.21,
        west: -3.29
    };

    const mapProperties = {
        center: await getGeolocation(),
        disableDefaultUI: true,
        loading: "lazy",
        mapId: "DEMO_MAP_ID",
        restriction: {
            latLngBounds: bristolAreaBounds,
            strictBounds: false
        },
        zoom: 17
    };

    googleMapsObject = new google.maps.Map(document.getElementById("map"), mapProperties);
    googleMapsObject.addListener("click", function(clickedEvent) {
        if (startMarkerMode) {
            setStartMarker(clickedEvent.latLng.toJSON());
        } else if (endMarkerMode) {
            setEndMarker(clickedEvent.latLng.toJSON());
        }
    });
    createMainRoutes();
}

/*
    getGeolocation:
    algorithm:
        returns a promise which gives the result of prompting the user for access to their
        geolocation. if they decline, the default coordinates are given (UWE)
*/
function getGeolocation() {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            // successful geolocation
            function(pos) {
                resolve({lat: pos.coords.latitude, lng: pos.coords.longitude});
            },
            // unsuccessful geolocation
            function() {
                resolve(defaultCoordinates);
            });
    });
}


// debug functions

// centers the map on the location
function mapGoTo(Lat, Lng) {
    let latlng = {lat: Lat, lng: Lng};
    googleMapsObject.setCenter(latlng);
}

// begins outputting the lat and lng coordinates of the mouse
// to the console when the mouse is clicked
function enableLatLngClick() {
    googleMapsObject.addListener("click", (mapsMouseEvent) => {
        console.log(mapsMouseEvent.latLng.toJSON());
    });
}
