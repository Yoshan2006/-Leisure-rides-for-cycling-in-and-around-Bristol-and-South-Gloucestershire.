// author: Mihiranga

function warn(msg) {
    let nullCheck = document.getElementById("warn");

    if (!nullCheck) {
        let warnPanel = document.createElement("div");
        warnPanel.classList.add("warn-panel");
        warnPanel.id = "warn";

        let warnTitle = document.createElement("h1");
        warnTitle.innerHTML = "Warning:";
        warnPanel.appendChild(warnTitle);

        let warnMsg = document.createElement("p");
        warnMsg.innerHTML = msg;
        warnPanel.appendChild(warnMsg);

        let warnBtn = document.createElement("button");
        warnBtn.innerHTML = "Okay!";
        warnBtn.onclick = () => document.body.removeChild(warnPanel);
        warnPanel.appendChild(warnBtn);

        document.body.appendChild(warnPanel);
    }
}
