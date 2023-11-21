/**
 * @jest-environment node
 */
import server from "nextjs-http-supertest";
import request from "supertest";
import { expect, jest, test } from "@jest/globals";

describe("login with Google API Endpoint", () => {
    it("should return 405 Method Not Allowed when using any non-POST method", async () => {
        const result = await request(server).get("/api/loginGoogle");
        expect(result.status).toBe(401);
    });

    it("should return 400 Method when not sending payload jwt token", async () => {
        const result = await request(server).post("/api/loginGoogle");
        expect(result.status).toBe(400);
    });

    it("should return 500 Method when not sending proper jwt token", async () => {
        const result = await request(server)
            .post("/api/loginGoogle")
            .send({ token: "123456" });
        expect(result.status).toBe(500);
    });
});
