import { usersMock } from "../../mocks/usersMock";
import User from "../../model/User";
import UsersMongooseRepository from "../UsersMongooseRepository";

describe("Given a  UsersMongooseRepository's class getUsers method", () => {
  describe("When it is called", () => {
    test("Then it should return a list of users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedUsers = usersMock;
      User.find = jest.fn().mockReturnValue(expectedUsers);

      const usersRepository = new UsersMongooseRepository();

      const users = await usersRepository.getUsers();

      expect(users).toStrictEqual(expectedUsers);
    });
  });
});
