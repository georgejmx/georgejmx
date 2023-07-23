import bcrypt from "bcryptjs";
import { AdminRequestBody } from "../types";
import { postData, adminInputHtml } from "./shared.js";

let selectedActionBtn: string;

// Returns an array of [hash, salt] that secures password
export function hashPassword(plaintext: string): string {
    const hash = bcrypt.hashSync(plaintext, 10);
    return hash;
}

/* Declaring HTML elements needed for manipulation of action content */
const actionBtns: Array<HTMLButtonElement> = [
    document.getElementById("artist-btn") as HTMLButtonElement,
    document.getElementById("hmu-btn") as HTMLButtonElement,
    document.getElementById("project-btn") as HTMLButtonElement,
    document.getElementById("story-btn") as HTMLButtonElement,
];
const inputsBox = document.getElementById("inputs-box") as HTMLDivElement;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

/* Adding event listeners to action buttons */
actionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        selectedActionBtn = btn.id as string;
        inputsBox.innerHTML = adminInputHtml(selectedActionBtn);
    });
});

// Show error message on page
function showError(msg: string) {
    const errField = document.getElementById("err-field") as HTMLParagraphElement;
    errField.textContent = msg;
}

/* Submit admin data to backend in correct format with error handling */
submitBtn.addEventListener("click", () => {
    const passcodeField = document.getElementById("passcode-field") as HTMLInputElement;

    // Initialising correct request body
    let requestBody: AdminRequestBody = {
        name: (document.getElementById("admin-input-1") as HTMLInputElement).value,
        model: "undefined",
    };
    switch (selectedActionBtn) {
        case "artist-btn": {
            requestBody.model = "ARTIST";
            break;
        }
        case "hmu-btn": {
            requestBody.model = "HMU";
            requestBody.intensity = parseInt(
                (document.getElementById("admin-input-2") as HTMLInputElement).value
            );
            requestBody.theme = parseInt(
                (document.getElementById("admin-input-3") as HTMLInputElement).value
            );
            break;
        }
        case "project-btn": {
            requestBody.model = "PROJECT";
            requestBody.url = (
                document.getElementById("admin-input-2") as HTMLInputElement
            ).value;
            requestBody.urlname = (
                document.getElementById("admin-input-3") as HTMLInputElement
            ).value;
            requestBody.desc = (
                document.getElementById("admin-input-4") as HTMLInputElement
            ).value;
            break;
        }
        case "story-btn": {
            requestBody.model = "STORY";
            requestBody.keyword = (
                document.getElementById("admin-input-2") as HTMLInputElement
            ).value;
            requestBody.theme = parseInt(
                (document.getElementById("admin-input-4") as HTMLInputElement).value
            );

            // Parsing paragraphs as array then adding
            const rawParagraphs: string = (
                document.getElementById("admin-input-3") as HTMLInputElement
            ).value;
            requestBody.paragraphs = rawParagraphs.split("\n").filter((el) => el);
            break;
        }
        default: {
            showError("uh ooh: no action button selected :/");
            return;
        }
    }

    // Fulfilling admin request
    postData(hashPassword(passcodeField.value), requestBody)
        .then((response) => {
            if (response.status === 201) {
                window.location.href = "/";
            }
            return response;
        })
        .then((response) => response.json())
        .then((bodyContents) => {
            if (!bodyContents) {
                showError("uh ooh: no response from server");
            } else {
                showError(`uh ooh: ${bodyContents.message}`);
            }
        })
        .catch((error: unknown) => {
            console.error(error);
            showError("uh ooh: error connecting to api");
        });
});
