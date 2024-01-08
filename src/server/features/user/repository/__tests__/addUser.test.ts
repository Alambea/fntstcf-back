import { leanneMock, usersMock } from "../../mocks/usersMock";
import User from "../../model/User";
import UsersMongooseRepository from "../UsersMongooseRepository";

describe("Given a  UsersMongooseRepository's class getUsers method", () => {
  describe("When it is called", () => {
    test("Then it should return a list of users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedUser = usersMock[0];
      const userToAdd = leanneMock;

      User.create = jest.fn().mockResolvedValue(expectedUser);

      const usersRepository = new UsersMongooseRepository();

      const users = await usersRepository.addUser(userToAdd);

      expect(users).toStrictEqual(expectedUser);
    });
  });
});
