// Written by Joe

/*
    latlngOffsetToKm:
    parameters:
    - LatLng1 : object [LatLngLiteral] (a generic js object containing lat and lng coordinates of a point)
    - LatLng2 : object [LatLngLiteral] (a generic js object containing lat and lng coordinates of another point)
    algorithm:
        uses Haversine formula to get the distance in kilometers between two latitude and longitude coordinates.
*/
function latlngOffsetToKm(LatLng1, LatLng2) {

    let lat1 = (Math.PI / 180) * LatLng1.lat;
    let lat2 = (Math.PI / 180) * LatLng2.lat;
    let lng1 = (Math.PI / 180) * LatLng1.lng;
    let lng2 = (Math.PI / 180) * LatLng2.lng;

    const earthRadius = 6371;
    let kmDistance =
        2 * earthRadius *
        Math.asin(Math.sqrt(Math.pow((Math.sin((lat2 - lat1) / 2)), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow((Math.sin((lng2 - lng1) / 2)), 2)));
    return kmDistance;
}
