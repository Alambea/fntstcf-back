import request from "supertest";
import { usersMock } from "../../../user/mocks/usersMock";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../../../../database";
import app from "../../../../app";
import { type UserStructure } from "../../../types";
import { server as mswServer } from "../../../../mocks/node";
import "../../../../index";
import User from "../../../user/model/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  mswServer.listen({ onUnhandledRequest: "bypass" });
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
  mswServer.close();
});

describe("Given a POST '/sync' endpoint", () => {
  describe(`When it receives a request`, () => {
    test.only("Then it should respond with a status 200, a list of users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedStatusCode = 200;
      const expectedUsers = usersMock;
      const path = "/sync";

      await User.create(usersMock[0]);

      const response = await request(app).post(path).expect(expectedStatusCode);

      const responseBody = response.body as {
        users: UserStructure[];
      };

      responseBody.users.forEach((user, userPosition) => {
        expect(user).toHaveProperty("name", expectedUsers[userPosition].name);
      });
    });
  });
});
