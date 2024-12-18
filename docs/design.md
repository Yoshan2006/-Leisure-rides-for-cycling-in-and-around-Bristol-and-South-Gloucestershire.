# Design

## User Interface design
The user interface for the program has been designed for each menu. It has a standard colour palette which is subject to change - the structure of the menus will remain the sane.

## Design Overview

![design_overview_img](images/design-wireframes/WFDesignOverview.png)

These are all the currently planned menus and user interfaces.

## Inspect Route UI

![inspect_route_img](images/design-wireframes/WFInspectRoute.png)

As shown in the diagram, when a route is clicked it will open up the "inspect route" user interface, which shows details regarding the route.

## Generate Route

One of the two principle uses of the program, generating routes, can be navigated to as seen below:

![page_navigation_img](images/design-wireframes/WFPageNavigation.png)

## Route Loading

![route_loading_img](images/design-wireframes/WFRouteLoading.png)

This UI will display while a route is being generated. This is to make the site feel responsive and the user is aware that their input has been regarded.

## Successful Route Load

![successful_loading_img](images/design-wireframes/WFSuccessfulLoading.png)

Ideally, this is the UI you will see the majority of the time a route is generated (while ignoring edge cases).

## Partial Route Load

![partial_route_img](images/design-wireframes/WFPartialLoading.png)

When a route can only be created with gaps between several cycle paths, it will still be generated and the user will be alerted.

## Unsuccessful Route Load

![unsuccessful_route_img](images/design-wireframes/WFUnsuccessfulLoading.png)

Under certain circumstances, such as choosing locations not within the area of Bristol and South Gloucestershire that the data collection supports, no route will be able to created and this UI will be displayed.
