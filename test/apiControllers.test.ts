import { story } from "@prisma/client";
import {
    getFascinationsController,
    getStoryByKeyController,
    postDescriptorController,
} from "../src/controllers/api";
import { Fascination } from "../src/types";
import { truncateTime } from "../src/utils";
import { descriptorRequestFixture, storyRequestFixture } from "./fixtures";
import { mockRes } from "./mocks";

describe("georgejmx successfully retrieves JSON data", () => {
    test("Getting fascinations succeeds when expected", async () => {
        const res = mockRes();
        const oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        const expectedFascinationsResponse: Fascination[] = [
            {
                id: 1,
                name: "python",
                intensity: 4,
                theme: 1,
                tstamp: truncateTime(Math.floor(oneWeekAgo.getTime() / 1000)),
                rating: 40,
                color: 420,
            },
        ];

        await getFascinationsController(null, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedFascinationsResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("Posting a new descriptor succeeds when expected", async () => {
        const req = descriptorRequestFixture();
        const res = mockRes();
        const expectedPostDescriptorResponse = { id: 9 };

        await postDescriptorController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedPostDescriptorResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("Getting a story by keyword succeeds when expected", async () => {
        const req = storyRequestFixture();
        const res = mockRes();
        const expectedGetStoryByKeyResponse: story = {
            id: 11,
            name: "Test story",
            keyword: "bananas",
            tstamp: 64000,
            paragraphs: ["i'll", "be back.."],
            theme: 0,
        };

        await getStoryByKeyController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expectedGetStoryByKeyResponse);
        expect(res.json).toHaveBeenCalledTimes(1);
    });
});
