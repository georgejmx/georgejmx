import "virtual:windi.css";

// Extracting URL parameters
const params: URLSearchParams = new URLSearchParams(window.location.search);

/* Fetching top artists from server */
const getArtists = async () => {
  const artistsRes = await fetch("/api/artists", { method: "GET" });
  return await artistsRes.json();
};

/* Fetching most recent stories from server */
const getRecentStories = async () => {
  const recentStoriesRes = await fetch("api/stories/recents", {
    method: "GET",
  });
  return await recentStoriesRes.json();
};

/* Fetching top fascinations from server */
const getFascinations = async () => {
  const fascRes = await fetch("/api/fascinations", { method: "GET" });
  return await fascRes.json();
};

/* Fetching stories HTML from server */
const getStoriesHtml = async () => {
  const storiesRes = await fetch("/html/stories", { method: "GET" });
  return await storiesRes.text();
};

/* Fetching projects HTML from server */
const getProjectsHtml = async () => {
  const projectsRes = await fetch("/html/projects", { method: "GET" });
  return await projectsRes.text();
};

/* Adding top artists to UI */
getArtists()
  .then((artists) => {
    const artistsEl = document.getElementById("artists-text") as HTMLElement;
    artistsEl.textContent = `Latest top artists:
    ${artists[0].name}, ${artists[1].name}, ${artists[2].name}`;
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
    const recentsEl = document.getElementById(
      "top-stories-text"
    ) as HTMLElement;
    recentsEl.textContent = `Most recent themes I have written about: 
      ${recents[0]}, ${recents[1]}, ${recents[2]}`;
  })
  .catch((err) => {
    console.error(err);
    const recentsEl = document.getElementById(
      "top-stories-text"
    ) as HTMLElement;
    recentsEl.textContent = "Error fetching recent stories";
  });

// Generates the correct HTML for a fascination item
const fascinationHtml = (name: string, intensity: number, color: number) => {
  const width = intensity + 18;
  let twColor = null;
  switch (color) {
    case 0:
      twColor = "orange-600";
      break;
    case 1:
      twColor = "yellow-500";
      break;
    case 2:
      twColor = "orange-400";
      break;
    default:
      twColor = "orange-600";
  }
  return `
    <div class="flex">
      <svg class="w-${width} h-4">
        <rect width="150" height="60" class="fill-${twColor}" />
      </svg>
      <p class="ml-2 text-${twColor} font-mono bg-black">${name}</p>
    </div>
  `;
};

// Grabs the HTML for stories from the backend and slaps it in the box
getStoriesHtml()
  .then((stories) => {
    const storyBox = document.getElementById("story-box") as HTMLDivElement;
    storyBox.innerHTML = stories;
  })
  .catch((err) => {
    console.error(err);
    const storyBox = document.getElementById("story-box") as HTMLDivElement;
    storyBox.innerHTML = `
      <p style="color: white;">Error getting stories from server.</p>`;
  });

// Grabs the HTML for projects from the backend and slaps it in the box
getProjectsHtml()
  .then((projects) => {
    const projectsBox = document.getElementById(
      "projects-box"
    ) as HTMLDivElement;
    projectsBox.innerHTML = projects;
  })
  .catch((err) => {
    console.error(err);
    const projectsBox = document.getElementById(
      "projects-box"
    ) as HTMLDivElement;
    projectsBox.innerHTML = `
    <p style="color: white;">Error getting projects from server.</p>`;
  });

/* Adding top fascinations to UI */
getFascinations()
  .then((fasc) => {
    let htmlStr = "";
    for (let f of fasc) {
      htmlStr += fascinationHtml(f.name, f.intensity, f.color);
    }
    const fBox = document.getElementById("fascination-box") as HTMLDivElement;
    fBox.innerHTML = htmlStr;
  })
  .catch((err) => {
    console.error(err);
    const fBox = document.getElementById("fascination-box") as HTMLDivElement;
    fBox.innerHTML = `
      <p style="color: white;">Error getting fascinations from server.</p>`;
  });

/* Adding most recent story keywords to UI */

/* Adding event listeners to top level buttons */
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

/* Processing any url parameters */
if (params.has("stories")) changeTabSelection(3);

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
