// author: Mihiranga

async function createMainRoutes() {
    let routeArray = await queryRoutes();
    let routex;
    for (routex of routeArray) {
        new route(routex);
    }
}
