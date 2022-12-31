import "virtual:windi.css";
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

// Check valid number; TODO: generalise to work for intensity
function checkEnum(a: number) {
  if (a !== 0 && a !== 1 && a !== 2) {
    return false;
  }
  return true;
}

/* Submit admin data to backend in correct format with error handling */
submitBtn.addEventListener("click", () => {
  // Parsing passcode field
  const passcodeField = document.getElementById(
    "passcode-field"
  ) as HTMLInputElement;
  console.log(passcodeField.value);

  // Performing desired request
  let requestBody: AdminRequestBody = {
    hash: passcodeField.value,
    name: (document.getElementById("admin-input-1") as HTMLInputElement).value,
  };
  switch (selectedActionBtn) {
    case "artist-btn": {
      break;
    }
    case "hmu-btn": {
      requestBody.intensity = parseInt(
        (document.getElementById("admin-input-2") as HTMLInputElement).value
      );
      requestBody.colour = parseInt(
        (document.getElementById("admin-input-3") as HTMLInputElement).value
      );

      if (!requestBody.intensity || !checkEnum(requestBody.colour)) {
        showError("uh ooh: intensity must be a number, colour in {0, 1, 2} :/");
        return;
      }
      break;
    }
    case "project-btn": {
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
  console.log(requestBody);
});

export {};
