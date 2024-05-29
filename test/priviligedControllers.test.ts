import type { Response } from "express";
import { postDataController } from "../src/controllers/priviliged";
import { insertFascinationRequestFixture, insertStoryRequestFixture } from "./fixtures";
import { mockRes } from "./mocks";

describe("georgejmx allows admin creation of data", () => {
    test("Inserting a valid fascination works as expected", async () => {
        const req = insertFascinationRequestFixture(true);
        const res = mockRes();

        const expectedIdResponse = {
            message: "Successfully created HMU entry",
            id: 8,
        };

        await postDataController(req, res as unknown as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedIdResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("Inserting a fascination with an invalid theme fails", async () => {
        const req = insertFascinationRequestFixture(false);
        const res = mockRes();

        const expectedErrorResponse = {
            message: "Theme property must be either 0, 1 or 2 to match UI",
            theme: 4,
        };

        await postDataController(req, res as unknown as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("Inserting a story works as expected", async () => {
        const req = insertStoryRequestFixture();
        const res = mockRes();

        const expectedIdResponse = {
            message: `Successfully created STORY entry`,
            id: 7,
        };

        await postDataController(req, res as unknown as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedIdResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });
});
