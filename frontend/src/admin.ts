import "virtual:windi.css";
import { SHA256 } from "crypto-js";
import { AdminRequestBody } from "./types";

let selectedActionBtn: string;

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
    switch (selectedActionBtn) {
      case "artist-btn": {
        inputsBox.innerHTML = `
        <label for="admin-input-1" class="leading-tight underline">Name:</label>
        <input
          id="admin-input-1"
          class="rounded border border-white bg-black my-2"
        />
        `;
        break;
      }
      case "hmu-btn": {
        inputsBox.innerHTML = `
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
          >Colour:</label
        >
        <input
          id="admin-input-3"
          class="rounded border border-white bg-black my-2"
        />
        `;
        break;
      }
      case "project-btn": {
        inputsBox.innerHTML = `
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
        break;
      }
      case "story-btn": {
        inputsBox.innerHTML = `
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
        break;
      }
    }
  });
});

// Show error message on page
function showError(msg: string) {
  const errField = document.getElementById("err-field") as HTMLParagraphElement;
  errField.textContent = msg;
}

// Check valid number input
function checkEnum(num: number, isIntensity: boolean = false): boolean {
  if (isIntensity) {
    if (num < 1 || num > 9) {
      return false;
    }
  } else {
    if (num !== 0 && num !== 1 && num !== 2) {
      return false;
    }
  }
  return true;
}

// Post data then return API response
async function postData(
  body: AdminRequestBody,
  model: string
): Promise<Response> {
  return await fetch(`/priviliged?model=${model}`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(body),
  });
}

/* Submit admin data to backend in correct format with error handling */
submitBtn.addEventListener("click", () => {
  // Parsing passcode field
  const passcodeField = document.getElementById(
    "passcode-field"
  ) as HTMLInputElement;

  // Initialising correct request body
  let requestBody: AdminRequestBody = {
    hash: SHA256(passcodeField.value).toString(),
    name: (document.getElementById("admin-input-1") as HTMLInputElement).value,
  };
  let model: string;
  switch (selectedActionBtn) {
    case "artist-btn": {
      model = "ARTIST";
      break;
    }
    case "hmu-btn": {
      model = "HMU";
      requestBody.intensity = parseInt(
        (document.getElementById("admin-input-2") as HTMLInputElement).value
      );
      requestBody.colour = parseInt(
        (document.getElementById("admin-input-3") as HTMLInputElement).value
      );

      if (!checkEnum(requestBody.colour)) {
        showError("uh ooh: colour must be in {0, 1, 2} :/");
        return;
      } else if (!checkEnum(requestBody.intensity)) {
        showError("uh ooh: intensity must be in {1, 2, ..., 9} :/");
        return;
      }
      break;
    }
    case "project-btn": {
      model = "PROJECT";
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
      model = "STORY";
      requestBody.keyword = (
        document.getElementById("admin-input-2") as HTMLInputElement
      ).value;
      requestBody.theme = parseInt(
        (document.getElementById("admin-input-4") as HTMLInputElement).value
      );

      if (!checkEnum(requestBody.theme)) {
        showError("uh ooh: theme must be in {0, 1, 2} :/");
        return;
      }

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
  postData(requestBody, model)
    .then((response) => {
      if (response.status === 204) {
        window.location.href = "/";
      }
      return response;
    })
    .then((response) => response.text())
    .then((bodyContents) => {
      if (!bodyContents) {
        throw Error("No error response from server");
      }
      showError(`uh ooh: ${bodyContents}`);
    })
    .catch((error: unknown) => {
      console.error(error);
      showError(`uh ooh: error connecting to api ${String(error)}`);
    });
});

export {};
