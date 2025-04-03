// Written by Joe

/*
    closestVertex:
    parameters:
    - startPos : object [LatLngLiteral] (contains lat and lng properties representing a coordinate position of the starting point)
*/
function closestVertex(startPos) {
    let closest;
    let route;
    for (route of mainRouteList) {
        if (route.type === "LineString") {
            for (let vertex of route.paths[0]) {
                if (!closest) {
                   closest = vertex;
                } else {
                    let distance1 = latlngOffsetToKm(startPos, vertex);
                    let distance2 = latlngOffsetToKm(startPos, closest);
                    if (distance1 < distance2) {
                        closest = vertex;
                    }
                }
            }
        } else if (route.type === "MultiLineString") {
            for (let minorRoute of route.paths) {
                for (let vertex of minorRoute) {
                    if (!closest) {
                        closest = vertex;
                    } else {
                        let distance1 = latlngOffsetToKm(vertex, startPos);
                        let distance2 = latlngOffsetToKm(closest, startPos);
                        if (distance1 < distance2) {
                            closest = vertex;
                        }
                    }
                }
            }
        }
    }
    return closest;
}
