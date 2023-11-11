/**
 * @jest-environment node
 */
import type { NextApiRequest, NextApiResponse } from "next";
import server from "nextjs-http-supertest";
import request from "supertest";
import { expect, jest, test } from "@jest/globals";

describe("login with Google API Endpoint", () => {
    it("should return 405 Method Not Allowed when using any non-GET method", async () => {
        const result = await request(server).post("/api/isLoggedIn");
        expect(result.status).toBe(401);
    });
});