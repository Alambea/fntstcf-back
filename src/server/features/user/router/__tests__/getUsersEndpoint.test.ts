import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../../../database";
import app from "../../../../app";
import { type UserStructure } from "../../../types";
import { usersMock } from "../../mocks/usersMock";
import User from "../../model/User";
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

describe("Given a GET '/users' endpoint", () => {
  describe(`When it receives a request`, () => {
    test("Then it should respond with a status 200, a lest of users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedStatusCode = 200;
      const expectedUsers = usersMock;
      const path = "/users";

      await User.create(usersMock[0]);
      await User.create(usersMock[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as {
        users: UserStructure[];
      };

      responseBody.users.forEach((user, userPosition) => {
        expect(user).toHaveProperty("name", expectedUsers[userPosition].name);
      });
    });
  });
});
