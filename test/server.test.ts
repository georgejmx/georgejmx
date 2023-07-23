import supertest, { agent } from "supertest";
import { app } from "../src/server";

let testServer: supertest.SuperAgentTest;

beforeAll(() => {
    testServer = agent(app);
});

const EXPECTED_HTML_SUBSTRINGS = [
    "DIY developer with a passion for technology and creativity.",
    "Click a button above to initiate an admin action :)",
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

    test("Index html renders correctly", (done: jest.DoneCallback) => {
        testServer
            .get("/")
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.text).toContain(EXPECTED_HTML_SUBSTRINGS[0]);
                done();
            })
            .catch((error) => done(error));
    });

    test("Admin html renders correctly", (done: jest.DoneCallback) => {
        testServer
            .get("/admin")
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
