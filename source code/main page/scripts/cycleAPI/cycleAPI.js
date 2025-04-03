// Written by Joe

/*
    _getRouteData:
    algorithm:
        performs a fetch request on the bristol opendata url and uses async await to effectively
        store the response as json, rather than clunky .then and .catch functions. finally, it catches
        an error if it fails to respond and uses the warn function to notify the user. the GET result is returned.
*/
async function _getRouteData() {
    // bristol open data fetch url
    let url = "https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_transport/MapServer/45/query?outFields=*&where=1%3D1&f=geojson";

    let data;
    try {
        data = await fetch(url);
        data = await data.json();
    } catch {
        warn("Could not connect to Bristol OpenData, no route data.");
    }
    return data;
}

// decodes the route json into an array of route objects and returns it
/*
    queryRoutes:
    algorithm:
        uses the _getRouteData to get all the information about cycle routes, and iterates through each feature
        converting each one into route instances and storing them in an array, which is returned.
*/
async function queryRoutes() {
    let routes = await _getRouteData();
    let routeArray = [];

    // iterate all features
    let feature;
    for (feature of routes.features) {
        // create new route array element for each feature
        // containing all required properties
        let routeElement = {
            colorcode: feature.properties.COLOUR_CODE,
            description: feature.properties.DESCRIPTION,
            difficulty: feature.properties.DIFFICULTY,
            distance: feature.properties.DISTANCE,
            id: feature.id,
            max: feature.properties.MAX_TIME,
            min: feature.properties.MIN_TIME,
            name: feature.properties.ROUTE_NAME,
            route: [],
            type: feature.geometry.type
        };

        // filling the route coordinates of the route element
        // LINESTRING implementation
        // (2D array of coordinates)
        if (routeElement.type === "LineString") {
            // iterate through each vertex
            let vertex;
            for (vertex of feature.geometry.coordinates) {
                let routeElementLatLng = {
                    lat: vertex[1],
                    lng: vertex[0]
                }
                routeElement.route.push(routeElementLatLng);
            }
        // MULTILINESTRING implementation
        // Array of separate 2D coordinate arrays
        } else if (routeElement.type === "MultiLineString") {
            // iterate through each inner route
            let innerRoute;
            for (innerRoute of feature.geometry.coordinates) {
                // iterate through each vertex
                let vertex;
                let LatLngInnerRoute = [];
                for (vertex of innerRoute) {
                    let routeElementLatLng = {
                        lat: vertex[1],
                        lng: vertex[0]
                    }
                    LatLngInnerRoute.push(routeElementLatLng);
                }
                routeElement.route.push(LatLngInnerRoute);
            }
        }
        routeArray.push(routeElement);
    }

    return routeArray;
}

// globals
let routeArray;
