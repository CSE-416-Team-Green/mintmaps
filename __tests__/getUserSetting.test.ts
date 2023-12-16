import type { NextApiRequest, NextApiResponse } from "next";
import server from "nextjs-http-supertest";
import request from "supertest";
import { expect, jest, test } from "@jest/globals";

describe("getUserSetting API Endpoint", () => {
    it("should return 405 Method Not Allowed when using any non-GET method", async () => {
        const result = await request(server).post("/api/getUserSetting");
        expect(result.status).toBe(405);
    });
    it("should return 404 when the user is not found", async () => {
        const result = await request(server).get("/api/getUserSetting");
        expect(result.status).toBe(404);
    });
});