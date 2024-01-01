import { changeTabSelection } from "./shared.js";

const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
const projectBtn = document.getElementById("projects-btn") as HTMLButtonElement;
const storyBtn = document.getElementById("story-btn") as HTMLButtonElement;

homeBtn.addEventListener("click", () => {
    changeTabSelection(1);
});
projectBtn.addEventListener("click", () => {
    changeTabSelection(2);
});
storyBtn.addEventListener("click", () => {
    changeTabSelection(3);
});
