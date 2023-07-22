// Generates the correct HTML for a fascination item
export const fascinationHtml = (name: string, intensity: number, theme: number) => {
    const width = intensity + 18;
    let twColor = null;
    switch (theme) {
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

// Generate HTML for admin inputs
export const adminInputHtml = (actionButtonId: string): string => {
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
