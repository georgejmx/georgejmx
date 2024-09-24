// Updates scrolling content upon menu button selection
function changeTabSelection(val: number) {
    const home = document.getElementById("home-box") as HTMLDivElement;
    const projects = document.getElementById("projects-box") as HTMLDivElement;
    switch (val) {
        case 1:
            home.style.display = "initial";
            projects.style.display = "none";
            break;
        case 2:
            home.style.display = "none";
            projects.style.display = "initial";
            break;
    }
}

const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
const projectBtn = document.getElementById("projects-btn") as HTMLButtonElement;

homeBtn.addEventListener("click", () => {
    changeTabSelection(1);
});
projectBtn.addEventListener("click", () => {
    changeTabSelection(2);
});
