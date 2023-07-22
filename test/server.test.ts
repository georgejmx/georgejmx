import supertest, { agent } from "supertest";
import { app } from "../src/server";

let testServer: supertest.SuperAgentTest;

beforeAll(() => {
    testServer = agent(app);
});

const EXPECTED_HTML_SUBSTRINGS = [
    '<h4 class="text-yellow-500 text-xl">There has been a problem finding Stories</h4>',
    '<h4 class="text-yellow-500 text-xl">There has been a problem finding Projects</h4>',
];

describe("georgejmx spins up correctly", () => {
    test("Server is healthy", (done: jest.DoneCallback) => {
        testServer
            .get("/health")
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.text).toEqual("Healthy");
                done();
            })
            .catch((error) => done(error));
    });

    test("Stories html is returned when necessary", (done: jest.DoneCallback) => {
        testServer
            .get("/html/stories")
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.text).toContain(EXPECTED_HTML_SUBSTRINGS[0]);
                done();
            })
            .catch((error) => done(error));
    });

    test("Projects html is returned when necessary", (done: jest.DoneCallback) => {
        testServer
            .get("/html/projects")
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.text).toContain(EXPECTED_HTML_SUBSTRINGS[1]);
                done();
            })
            .catch((error) => done(error));
    });

    test("Priviliged routes require a token", (done: jest.DoneCallback) => {
        testServer
            .post("/priviliged")
            .send({ name: "supertest", model: "hmu" })
            .then((response) => {
                expect(response.status).toEqual(401);
                expect(response.body.message).toEqual("No admin token present in request");
                done();
            })
            .catch((error) => done(error));
    });

    test("Priviliged routes validate all tokens", (done: jest.DoneCallback) => {
        testServer
            .post("/priviliged")
            .set("authorisation", "Bearer 1234567890")
            .send({ name: "supertest", model: "hmu" })
            .then((response) => {
                expect(response.status).toEqual(401);
                expect(response.body.message).toEqual("Invalid admin token in request");
                done();
            })
            .catch((error) => done(error));
    });

    test("Server handles all paths", (done: jest.DoneCallback) => {
        testServer
            .get("/test/fake/44")
            .then((response) => {
                expect(response.status).toEqual(404);
                expect(response.body.message).toEqual("Resource not found");
                done();
            })
            .catch((error) => done(error));
    });
});
