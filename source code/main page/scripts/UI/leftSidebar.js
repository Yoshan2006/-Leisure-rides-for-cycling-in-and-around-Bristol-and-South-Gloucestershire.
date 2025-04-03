// author: Mihiranga

/* transitionLeftSidebar
    parameters:
    - direction -> string "open" or "close" expected

    usage:
    moves the left sidebar containing the generate route functionality.
    this function should only be called from the generate route button
    on the main page, or from the back button on the sidebar itself.
*/
function transitionLeftSidebar(direction) {
    // store the appropriate elements
    let leftSidebar = document.getElementById("left");
    let logo = document.getElementById("logo");
    let btn = document.getElementById("generate");

    if (direction === "open") {
        // add style to move the sidebar open
        leftSidebar.style = `animation: left-sidebar-open 0.75s ease-in-out;
        animation-fill-mode: forwards;`;

        // add style to fade the generate route button out
        btn.style = `animation: hide-button 0.5s ease-out;
        animation-fill-mode: forwards;`;

        // add style to move the logo out the way of the sidebar as it opens
        logo.style = `animation: logo-shift-right 0.75s ease-in-out;
        animation-fill-mode: forwards;`;
    } else if (direction === "close") {
        // add style to move the sidebar closed
        leftSidebar.style = `animation: left-sidebar-close 0.75s ease-in-out;
        animation-fill-mode: forwards;`;

        // add style to fade the generate route button back in
        btn.style = `animation: show-button 0.5s ease-out;
        animation-fill-mode: forwards;`;

        // add style to transition the logo back to its original position
        logo.style = `animation: logo-shift-left 0.75s ease-in-out;
        animation-fill-mode: forwards;`;
    }
}
