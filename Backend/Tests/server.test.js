import request from "supertest";
import app from "../server"; // ✅ Import Express app

describe("NASA API Endpoints", () => {
  it("🔹 Should return APOD data", async () => {
    const res = await request(app).get("/api/apod");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
  });

  it("🔹 Should return Mars rover photos", async () => {
    const res = await request(app).get("/api/mars-photos?rover=curiosity&sol=1000");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("🔹 Should return a 404 for an invalid route", async () => {
    const res = await request(app).get("/api/invalid");
    expect(res.statusCode).toEqual(404);
  });
});

// ✅ Ensure Jest exits properly
afterAll(() => {
  app.close?.(); // Gracefully close server (if applicable)
});
