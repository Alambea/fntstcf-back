import request from "supertest";
import app from "../app";
import "../index";

describe("Given a GET /not-found endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 404 error 'Endpoint not found'", async () => {
      const expectedStatusCode = 404;
      const expectedErrorMessage = "Endpoint not found";
      const path = "/not-found";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
