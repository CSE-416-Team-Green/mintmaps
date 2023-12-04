/**
 * @jest-environment node
 */
import type { NextApiRequest, NextApiResponse } from "next";
import server from "nextjs-http-supertest";
import request from "supertest";
import { expect, jest, test } from "@jest/globals";

describe("likeMap API Endpoint", () => {
    it("should return 405 Method Not Allowed when using any non-POST method", async () => {
        const result = await request(server).get("/api/likeMap");
        expect(result.status).toBe(401);
    });
    it("should return 500 when the user is not found", async () => {
        const result = await request(server)
            .post("/api/likeMap")
            .send({ mapId: "123", email: ""});
        expect(result.status).toBe(500);
    });
});