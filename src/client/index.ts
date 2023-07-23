import { changeTabSelection } from "./shared.js";

const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
const projectBtn = document.getElementById("projects-btn") as HTMLButtonElement;
const storyBtn = document.getElementById("story-btn") as HTMLButtonElement;
const adminButton = document.getElementById("admin-btn") as HTMLButtonElement;
const readStoryButtons = document.querySelectorAll(
    ".read-story-btn"
) as NodeListOf<HTMLButtonElement>;

homeBtn.addEventListener("click", () => {
    changeTabSelection(1);
});
projectBtn.addEventListener("click", () => {
    changeTabSelection(2);
});
storyBtn.addEventListener("click", () => {
    changeTabSelection(3);
});
adminButton.addEventListener("click", () => {
    window.location.href = "/admin";
});
readStoryButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        window.location.href = `/story/${button.id.split("-")[0]}`;
    });
});
