import request from "supertest";
import app from "../../../../app";
import "../../../../index";

describe("Given a GET /ping endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and the message '🏓'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
