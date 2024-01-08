import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../../../database";
import app from "../../../../app";
import { type UserWithoutId, type UserStructure } from "../../../types";
import { leanneMock, usersMock } from "../../mocks/usersMock";
import "../../../../index";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a PUT '/users' endpoint", () => {
  describe(`When it receives a request with a '${leanneMock.name}' user data`, () => {
    test(`Then it should respond with a status 201, the user '${leanneMock.name}'`, async () => {
      const expectedStatusCode = 201;
      const expectedUser = usersMock[0];
      const userToPut = leanneMock;
      const path = "/users";

      const response = await request(app)
        .put(path)
        .send(userToPut as UserWithoutId)
        .expect(expectedStatusCode);

      const responseBody = response.body as {
        user: UserStructure;
      };

      expect(responseBody.user).toHaveProperty("name", expectedUser.name);
    });
  });
});
