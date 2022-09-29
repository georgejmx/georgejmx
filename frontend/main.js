import "virtual:windi.css";

/* Fetching top artists from server */
const getArtists = async () => {
  const artistsRes = await fetch("/api/artists", { method: "GET" });
  return await artistsRes.json();
};

/* Fetching top fascinations from server */
const getFascinations = async () => {
  const fascRes = await fetch("/api/fascinations", { method: "GET" });
  return await fascRes.json();
};

/* Fetching stories HTML from server */
const getStoriesHtml = async () => {
  const storiesRes = await fetch("stories", { method: "GET" });
  return await storiesRes.text();
};

/* Fetching projects HTML from server */
const getProjectsHtml = async () => {
  const projectsRes = await fetch("projects", { method: "GET" });
  return await projectsRes.text();
};

/* Adding top artists to UI */
getArtists()
  .then((artists) => {
    document.getElementById("artists-text").textContent = `Latest top artists:
    ${artists[0].name}, ${artists[1].name}, ${artists[2].name}`;
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("artists-text").textContent =
      "Error fetching artists";
  });

// Generates the correct HTML for a fascination item
const fascinationHtml = (name, intensity, color) => {
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
    document.getElementById("story-box").innerHTML = stories;
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("story-box").innerHTML = `
      <p style="color: white;">Error getting stories from server.</p>`;
  });

// Grabs the HTML for projects from the backend and slaps it in the box
getProjectsHtml()
  .then((projects) => {
    document.getElementById("projects-box").innerHTML = projects;
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("projects-box").innerHTML = `
    <p style="color: white;">Error getting projects from server.</p>`;
  });

/* Adding top fascinations to UI */
getFascinations()
  .then((fasc) => {
    let htmlStr = "";
    for (let f of fasc) {
      htmlStr += fascinationHtml(f.name, f.intensity, f.color);
    }
    document.getElementById("fascination-box").innerHTML = htmlStr;
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("fascination-box").innerHTML = `
      <p style="color: white;">Error getting fascinations from server.</p>`;
  });

/* Adding event listeners to top level buttons */
document.getElementById("home-btn").addEventListener("click", () => {
  changeTabSelection(1);
});
document.getElementById("projects-btn").addEventListener("click", () => {
  changeTabSelection(2);
});
document.getElementById("story-btn").addEventListener("click", () => {
  changeTabSelection(3);
});

/* Updates scrolling content upon menu button selection */
function changeTabSelection(val) {
  const home = document.getElementById("home-box");
  const projects = document.getElementById("projects-box");
  const stories = document.getElementById("story-box");
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
