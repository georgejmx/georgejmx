import { AdminRequestBody } from "../types";

// Updates scrolling content upon menu button selection
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

// Obtain an access token with supplied user password
async function obtainToken(hash: string): Promise<string> {
    const response = await fetch("/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ hash }),
    });
    if (response.status !== 201) {
        throw Error("Unable to establish access token");
    }
    return (await response.json()).accessToken;
}

// Post data then return API response
async function postData(hash: string, body: AdminRequestBody): Promise<Response> {
    const accessToken = await obtainToken(hash);
    return await fetch("/priviliged", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorisation: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    });
}

// Generate HTML for admin inputs
const adminInputHtml = (actionButtonId: string): string => {
    switch (actionButtonId) {
        case "artist-btn": {
            return `
                <label for="admin-input-1" class="leading-tight underline">Name:</label>
                <input
                  id="admin-input-1"
                  class="rounded border border-white bg-black my-2"
                />
            `;
        }
        case "hmu-btn": {
            return `
                <label for="admin-input-1" class="leading-tight underline">Name:</label>
                <input
                  id="admin-input-1"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-2" class="leading-tight underline"
                  >Intensity:</label
                >
                <input
                  id="admin-input-2"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-3" class="leading-tight underline"
                  >Theme:</label
                >
                <input
                  id="admin-input-3"
                  class="rounded border border-white bg-black my-2"
                />
            `;
        }
        case "project-btn": {
            return `
                <label for="admin-input-1" class="leading-tight underline">Name:</label>
                <input
                  id="admin-input-1"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-2" class="leading-tight underline">Url:</label>
                <input
                  id="admin-input-2"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-3" class="leading-tight underline"
                  >Urlname:</label
                >
                <input
                  id="admin-input-3"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-4" class="leading-tight underline"
                  >Description:</label
                >
                <input
                  id="admin-input-4"
                  class="rounded border border-white bg-black my-2"
                />
            `;
        }
        case "story-btn": {
            return `
                <label for="admin-input-1" class="leading-tight underline">Name:</label>
                <input
                  id="admin-input-1"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-2" class="leading-tight underline"
                  >Keyword:</label
                >
                <input
                  id="admin-input-2"
                  class="rounded border border-white bg-black my-2"
                />
                <br />
                <label for="admin-input-3" class="leading-tight underline"
                  >Paragraphs:</label
                >
                <textarea
                  rows="10"
                  id="admin-input-3"
                  class="rounded border border-white bg-black align-top my-2"
                ></textarea>
                <br />
                <label for="admin-input-4" class="leading-tight underline"
                  >Theme:</label
                >
                <input
                  id="admin-input-4"
                  class="rounded border border-white bg-black my-2"
                />
            `;
        }
        default:
            return `<p class="leading-tight underline">No input options for this type</p>`;
    }
};

export { changeTabSelection, postData, adminInputHtml };
