import { adminInputHtml } from "../src/client/shared";

describe("Client functionality works as expected", () => {
    test("Retrieving admin input html", () => {
        const expectedClientHtmlSubstrings = [
            '<label for="admin-input-1" class="leading-tight underline">Name:</label>',
            ">Intensity:</label",
        ];

        const adminHtmlResult = adminInputHtml("hmu-btn");
        expect(adminHtmlResult).toContain(expectedClientHtmlSubstrings[0]);
        expect(adminHtmlResult).toContain(expectedClientHtmlSubstrings[1]);
    });
});
