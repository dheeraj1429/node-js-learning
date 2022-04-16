const request = require("supertest");
const app = require("../app");

describe("Test GET", () => {
    test("should ", async () => {
        const res = await request(app).get("/home/add");
        expect(res.statusCode).toBe(200);
    });
});
