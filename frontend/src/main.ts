import "virtual:windi.css";
import {
    getArtists,
    getFascinations,
    getProjectsHtml,
    getRecentStories,
    getStoriesHtml,
} from "./handlers";
import { fascinationHtml } from "./utils";

/* Updates scrolling content upon menu button selection */
function changeTabSelection(val: number) {
    const home = document.getElementById("home-box") as HTMLDivElement;
    const projects = document.getElementById("projects-box") as HTMLDivElement;
    const stories = document.getElementById("story-box") as HTMLDivElement;
    switch (val) {
        case 1:
            home.style.display = "initial";
            projects.style.display = "none";
            stories.style.display = "none";
            break;
        case 2:
            home.style.display = "none";
            projects.style.display = "initial";
            stories.style.display = "none";
            break;
        case 3:
            home.style.display = "none";
            projects.style.display = "none";
            stories.style.display = "initial";
            break;
    }
}

// Stopping auxiliary pages from loading main DOM manipulations
if (!window.location.href.includes("/story/")) {
    // Extracting URL parameters
    const params: URLSearchParams = new URLSearchParams(window.location.search);

    /* Adding top artists to UI */
    getArtists()
        .then((artists) => {
            const artistsEl = document.getElementById("artists-text") as HTMLElement;
            artistsEl.textContent = `Latest top artists: ${artists[0].name}, ${artists[1].name}, ${artists[2].name}`;
        })
        .catch((err) => {
            console.error(err);
            const artistsEl = document.getElementById("artists-text") as HTMLElement;
            artistsEl.textContent = "Error fetching artists";
        });

    /* Adding most recent stories to UI */
    getRecentStories()
        .then((resp) => {
            const recents: string[] = resp.recents;
            const recentsEl = document.getElementById("top-stories-text") as HTMLElement;
            recentsEl.textContent = `Most recent themes I have written about: ${recents[0]}, ${recents[1]}, ${recents[2]}`;
        })
        .catch((err) => {
            console.error(err);
            const recentsEl = document.getElementById("top-stories-text") as HTMLElement;
            recentsEl.textContent = "Error fetching recent stories";
        });

    // Grabs the HTML for stories from the backend and slaps it in the box
    getStoriesHtml()
        .then((stories) => {
            const storyBox = document.getElementById("story-box") as HTMLDivElement;
            storyBox.innerHTML = stories;
        })
        .catch((err) => {
            console.error(err);
            const storyBox = document.getElementById("story-box") as HTMLDivElement;
            storyBox.innerHTML =
                '<p style="color: white;">Error getting stories from server.</p>';
        });

    // Grabs the HTML for projects from the backend and slaps it in the box
    getProjectsHtml()
        .then((projects) => {
            const projectsBox = document.getElementById("projects-box") as HTMLDivElement;
            projectsBox.innerHTML = projects;
        })
        .catch((err) => {
            console.error(err);
            const projectsBox = document.getElementById("projects-box") as HTMLDivElement;
            projectsBox.innerHTML =
                '<p style="color: white;">Error getting projects from server.</p>';
        });

    /* Adding top fascinations to UI */
    getFascinations()
        .then((fasc) => {
            let htmlStr = "";
            for (let f of fasc) {
                htmlStr += fascinationHtml(f.name, f.intensity, f.theme);
            }
            const fBox = document.getElementById("fascination-box") as HTMLDivElement;
            fBox.innerHTML = htmlStr;
        })
        .catch((err) => {
            console.error(err);
            const fBox = document.getElementById("fascination-box") as HTMLDivElement;
            fBox.innerHTML = `
                <p class="inline text-yellow-500 text-sm font-mono font-bold">an error getting fascinations from the server :O</p>`;
        });

    /* Adding event listeners to top level buttons */
    const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
    const projectBtn = document.getElementById("projects-btn") as HTMLButtonElement;
    const storyBtn = document.getElementById("story-btn") as HTMLButtonElement;
    const adminButton = document.getElementById("admin-btn") as HTMLButtonElement;
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
        window.location.href = "/admin.html";
    });

    /* Processing any url parameters */
    if (params.has("stories")) changeTabSelection(3);
}

export {};
