import { AdminRequestBody } from "./types";

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

/* Fetching top artists from server */
export const getArtists = async () => {
    const artistsRes = await fetch("/api/artists", { method: "GET" });
    return await artistsRes.json();
};

/* Fetching most recent stories from server */
export const getRecentStories = async () => {
    const recentStoriesRes = await fetch("api/stories/recents", {
        method: "GET",
    });
    return await recentStoriesRes.json();
};

/* Fetching top fascinations from server */
export const getFascinations = async () => {
    const fascRes = await fetch("/api/fascinations", { method: "GET" });
    return await fascRes.json();
};

/* Fetching stories HTML from server */
export const getStoriesHtml = async () => {
    const storiesRes = await fetch("/html/stories", { method: "GET" });
    return await storiesRes.text();
};

/* Fetching projects HTML from server */
export const getProjectsHtml = async () => {
    const projectsRes = await fetch("/html/projects", { method: "GET" });
    return await projectsRes.text();
};

// Post data then return API response
export async function postData(hash: string, body: AdminRequestBody): Promise<Response> {
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
