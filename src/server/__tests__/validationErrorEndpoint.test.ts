import request from "supertest";
import app from "../app";
import "../index";

describe("Given a PUT /users endpoint", () => {
  describe("When it receives a request with an user in the body with an adress as number", () => {
    test("Then it should respond with a status 400 error 'adress must be a string'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "address must be a string";
      const path = "/users";
      const userToAdd = {
        name: "test",
        email: "test",
        username: "test",
        address: 1,
      };

      const response = await request(app).put(path).send(userToAdd);
      expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
